import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { protectAdmin } from '../middleware/auth.js'

const router = express.Router()

// Ensure uploads directory exists
const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir)
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `img-${uniqueSuffix}${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg/
  const ext = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime = allowed.test(file.mimetype)

  if (ext && mime) {
    return cb(null, true)
  }
  cb(new Error('Only image files (jpeg, jpg, png, webp, gif, svg) are allowed!'))
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
})

router.post('/', protectAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' })
  }

  // Construct accessible URL
  const serverUrl = `${req.protocol}://${req.get('host')}`
  const fileUrl = `${serverUrl}/uploads/${req.file.filename}`

  return res.json({
    success: true,
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
  })
})

export default router
