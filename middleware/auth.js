import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protectAdmin = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'jia_secure_jwt_secret_token_key_2026_super_safe'
      )

      req.admin = await Admin.findById(decoded.id).select('-password')
      if (!req.admin) {
        return res.status(401).json({ success: false, message: 'Admin account not found' })
      }
      return next()
    } catch (error) {
      console.error('[Auth Error]:', error.message)
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid or expired token' })
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' })
  }
}
