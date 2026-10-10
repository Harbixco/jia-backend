import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'jia_secure_jwt_secret_token_key_2026_super_safe',
    { expiresIn: '30d' }
  )
}

// @desc Admin Login
// @route POST /api/auth/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    }

    // Check if any admin exists at all; if not, auto-seed default admin
    const adminCount = await Admin.countDocuments()
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@jesusinafrica.org'
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123'
      await Admin.create({
        name: 'JIA Lead Admin',
        email: defaultEmail,
        password: defaultPassword,
        role: 'superadmin',
      })
      console.log(`[Auto-Seed]: Created initial admin account ${defaultEmail}`)
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() })

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id)
      return res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      })
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('[Login Error]:', error)
    return res.status(500).json({ success: false, message: 'Server error during login', error: error.message })
  }
}

// @desc Get current admin profile
// @route GET /api/auth/me
export const getAdminProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin: req.admin,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// @desc Update admin profile / password
// @route PUT /api/auth/profile
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id)
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    if (req.body.name) admin.name = req.body.name
    if (req.body.email) admin.email = req.body.email.toLowerCase().trim()
    if (req.body.password) {
      admin.password = req.body.password
    }

    const updated = await admin.save()
    return res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
