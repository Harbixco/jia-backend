import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Admin from '../models/Admin.js'

dotenv.config()

async function createAdmin() {
  const args = process.argv.slice(2)
  // Usage: node scripts/createAdmin.js <email> <password> [name] [role]
  const email = args[0]
  const password = args[1]
  const name = args[2] || 'Admin User'
  const role = args[3] || 'superadmin'

  if (!email || !password) {
    console.error('Usage: node scripts/createAdmin.js <email> <password> [name] [role]')
    process.exit(1)
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    
    const cleanEmail = email.toLowerCase().trim()
    const existing = await Admin.findOne({ email: cleanEmail })
    
    if (existing) {
      console.log(`Admin with email "${cleanEmail}" already exists. Updating password and details...`)
      existing.password = password
      existing.name = name
      existing.role = role
      await existing.save()
      console.log(`Successfully updated admin: ${cleanEmail} (${role})`)
    } else {
      const newAdmin = await Admin.create({
        name,
        email: cleanEmail,
        password,
        role,
      })
      console.log(`Successfully created new admin: ${cleanEmail} (${role})`)
    }

    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Error creating admin:', err)
    process.exit(1)
  }
}

createAdmin()
