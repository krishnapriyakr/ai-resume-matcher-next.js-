// lib/adminSetup.ts

import 'server-only' //  Prevents this from running on client
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

let isSetupDone = false //  Prevents multiple runs

export async function setupAdmin() {
  // ✅ Only run once
  if (isSetupDone) {
    return
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminName = process.env.ADMIN_NAME || 'System Admin'

    // Check if admin credentials are set
    if (!adminEmail || !adminPassword) {
      console.log(' Admin credentials not set in environment variables')
      return
    }

    // ✅ Check if prisma is available
    if (!prisma) {
      console.log(' Prisma client not initialized yet')
      return
    }

    // Check if admin already exists
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

    isSetupDone = true
  } catch (error) {
    console.error(' Admin setup error:', error)
    // Don't throw - let the app start even if admin setup fails
  }
}