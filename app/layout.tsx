// app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { setupAdmin } from '@/lib/adminSetup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Resume Matcher',
  description: 'AI-powered resume parser and job matching platform',
}

//  Run admin setup when server starts
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  // This runs once when the server starts
  setupAdmin().catch(console.error)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}