// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Global variable to prevent multiple connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create single Prisma instance
export const prisma = globalForPrisma.prisma || new PrismaClient()

// In development, reuse the same connection
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma