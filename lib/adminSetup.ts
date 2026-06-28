// lib/adminSetup.ts

import prisma from './prisma'
import bcrypt from 'bcryptjs'

export async function setupAdmin() {
  try {
    // ✅ Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.log(' DATABASE_URL not set. Skipping admin setup.')
      return
    }

    // ✅ Check if admin credentials are set
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminName = process.env.ADMIN_NAME || 'System Admin'

    if (!adminEmail || !adminPassword) {
      console.log(' Admin credentials not set in environment variables')
      return
    }

    // ✅ Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)

      await prisma.user.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
        },
      })

      console.log(` Admin created: ${adminEmail}`)
    } else {
      console.log(` Admin already exists: ${adminEmail}`)
    }
  } catch (error) {
    console.error(' Admin setup error:', error)
  }
}