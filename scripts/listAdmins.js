import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from '../models/Admin.js'

dotenv.config()

async function listAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const admins = await Admin.find({}, 'name email role createdAt')
    console.log('EXISTING_ADMINS:', JSON.stringify(admins))
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

listAdmins()
