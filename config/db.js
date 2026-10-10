import mongoose from 'mongoose'
import dns from 'dns'

// Resolve Windows ECONNREFUSED with mongodb+srv SRV lookups by using standard public DNS
try {
  dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch (e) {
  // Ignore in serverless environments where custom DNS servers may be restricted
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log(`[MongoDB Connected]: ${conn.connection.host}`)
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`)
  }
}

export default connectDB
