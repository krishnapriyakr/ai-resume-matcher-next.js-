// This imports NextAuth's built-in middleware
import { withAuth } from 'next-auth/middleware'

// This imports Next.js's response helper
import { NextResponse } from 'next/server'

// This is the main middleware function
export default withAuth(
  // This function runs for every request
  function middleware(req) {
    // Get the user's token (their login info)
    const token = req.nextauth.token
    
    // Get the URL they are trying to visit
    const path = req.nextUrl.pathname

    // ROLE-BASED ACCESS CONTROL
    
    // If they try to go to /dashboard/admin but are NOT admin
    if (path.startsWith('/dashboard/admin') && token?.role !== 'ADMIN') {
      // Redirect them to /dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If they try to go to /dashboard/hr but are NOT HR or Admin
    if (path.startsWith('/dashboard/hr') && token?.role !== 'HR' && token?.role !== 'ADMIN') {
      // Redirect them to /dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If everything is okay, let them proceed
    return NextResponse.next()
  },
  {
    callbacks: {
      // User must be logged in to access protected routes
      authorized: ({ token }) => !!token  // !!token means "token exists"
    }
  }
)

// Which routes are protected (need login)
export const config = {
  matcher: [
    '/dashboard/:path*',   // All dashboard pages
    '/resumes/:path*',     // All resume pages
    '/jobs/:path*',        // All job pages
    '/matches/:path*',     // All match pages
    '/api/resumes/:path*', // All resume API routes
    '/api/jobs/:path*',    // All job API routes
    '/api/match/:path*',   // All match API routes
  ]
}