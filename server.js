import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import statsRoutes from './routes/statsRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize express app
const app = express()

// Connect to MongoDB
connectDB().catch((err) => console.error('[Initial DB Connect]:', err.message))

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Ensure DB connection for each incoming serverless request
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Database Connection Failed: ${err.message}`,
    })
  }
})

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Jesus In Africa API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
  })
})

// DB Diagnostic Endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      return res.status(500).json({
        status: 'error',
        message: 'MONGODB_URI environment variable is missing on Vercel!',
      })
    }
    const masked = uri.replace(/:([^@]+)@/, ':****@')
    await connectDB()
    return res.json({
      status: 'success',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'unknown',
      uri: masked,
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
      name: err.name,
      uri: process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@')
        : 'undefined',
    })
  }
})

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Jesus In Africa Backend API is live!',
  })
})

// Mount API routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/upload', uploadRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

// Only listen on port when running standalone (not in Vercel serverless)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`===============================================`)
    console.log(`🚀 JIA Backend API Server running on port ${PORT}`)
    console.log(`📡 URL: http://localhost:${PORT}`)
    console.log(`===============================================`)
  })
}

export default app
