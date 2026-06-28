// app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Resume Matcher',
  description: 'AI-powered resume parser and job matching platform',
}

// ✅ Move admin setup to a separate file that handles errors
async function initializeApp() {
  try {
    const { setupAdmin } = await import('@/lib/adminSetup')
    await setupAdmin()
  } catch (error) {
    console.error('App initialization error:', error)
  }
}

// ✅ Run admin setup when server starts
// This runs only once on server startup
if (typeof window === 'undefined') {
  initializeApp().catch(console.error)
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