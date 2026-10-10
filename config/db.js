import mongoose from 'mongoose'
import dns from 'dns'

// Only apply custom DNS servers on Windows local machines to fix Windows querySrv bug.
// DO NOT apply on Linux/Vercel/AWS Lambda as AWS blocks outgoing UDP 53 to external DNS!
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
  } catch (e) {
    // Ignore
  }
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  if (!process.env.MONGODB_URI) {
    console.error('[MongoDB Error]: MONGODB_URI environment variable is not defined!')
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    })
    console.log(`[MongoDB Connected]: ${conn.connection.host}`)
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`)
    throw error
  }
}

export default connectDB
