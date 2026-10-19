import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { protectAdmin } from '../middleware/auth.js'

const router = express.Router()

// Check if Cloudinary credentials are provided
const isCloudinaryConfigured = () => {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET) ||
      process.env.CLOUDINARY_URL
  )
}

// Initialize Cloudinary config
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

// Use Memory Storage for Serverless environments (no read-only disk issues)
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg/i
  const ext = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime = allowed.test(file.mimetype)

  if (ext && mime) {
    return cb(null, true)
  }
  cb(new Error('Only image files (jpeg, jpg, png, webp, gif, svg) are allowed!'))
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter,
})

// Helper to stream upload buffer to Cloudinary
const streamUploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    // Clean original filename for public id
    const cleanName = path
      .basename(originalname, path.extname(originalname))
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40)

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'jesusinafrica/posts',
        public_id: `${cleanName}_${Date.now()}`,
        resource_type: 'image',
        transformation: [
          { width: 1600, height: 1200, crop: 'limit' },
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

// GET /api/upload/status - Diagnostic check for upload service
router.get('/status', (req, res) => {
  res.json({
    configured: isCloudinaryConfigured(),
    service: isCloudinaryConfigured() ? 'Cloudinary CDN' : 'Local Fallback',
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Missing',
  })
})

// POST /api/upload - Upload single image
router.post('/', protectAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' })
  }

  try {
    // 1. If Cloudinary is configured, upload to Cloudinary CDN
    if (isCloudinaryConfigured()) {
      const result = await streamUploadToCloudinary(
        req.file.buffer,
        req.file.originalname
      )

      return res.json({
        success: true,
        message: 'Image uploaded to Cloudinary CDN successfully',
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      })
    }

    // 2. If running on Vercel and Cloudinary is not configured, inform the user clearly
    if (process.env.VERCEL) {
      return res.status(400).json({
        success: false,
        message:
          'Cloudinary is not yet configured on Vercel. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your Vercel Project Environment Variables.',
      })
    }

    // 3. Local Development Fallback: Save to local ./uploads directory
    const uploadDir = path.resolve('uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const ext = path.extname(req.file.originalname)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `img-${uniqueSuffix}${ext}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, req.file.buffer)

    const serverUrl = `${req.protocol}://${req.get('host')}`
    const fileUrl = `${serverUrl}/uploads/${filename}`

    return res.json({
      success: true,
      message: 'File uploaded locally (development mode)',
      url: fileUrl,
      filename,
    })
  } catch (error) {
    console.error('[Upload Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    })
  }
})

// POST /api/upload/multiple - Upload up to 20 images in batch
router.post('/multiple', protectAdmin, upload.array('images', 20), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No image files uploaded' })
  }

  try {
    const uploadedImages = []

    for (const file of req.files) {
      if (isCloudinaryConfigured()) {
        const result = await streamUploadToCloudinary(file.buffer, file.originalname)
        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        })
      } else {
        const uploadDir = path.resolve('uploads')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }
        const ext = path.extname(file.originalname)
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const filename = `img-${uniqueSuffix}${ext}`
        fs.writeFileSync(path.join(uploadDir, filename), file.buffer)
        const serverUrl = `${req.protocol}://${req.get('host')}`
        uploadedImages.push({
          url: `${serverUrl}/uploads/${filename}`,
          filename,
        })
      }
    }

    return res.json({
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      images: uploadedImages,
      urls: uploadedImages.map((img) => img.url),
    })
  } catch (error) {
    console.error('[Multiple Upload Error]:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Multiple images upload failed',
    })
  }
})

export default router

