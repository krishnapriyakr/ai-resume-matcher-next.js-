// app/(dashboard)/dashboard/page.tsx

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardBody, CardHeader } from '@/app/components/ui/Card'

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome, {user?.name || 'User'}!
      </h1>
      <p className="text-gray-600 mb-8">
        You are logged in as: <span className="font-semibold">{user?.role}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-gray-800">Upload Resume</h2>
            <p className="text-gray-600 text-sm mt-1">Upload your resume for AI matching</p>
            <button className="mt-3 text-blue-600 hover:underline">Upload now →</button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-gray-800">View Jobs</h2>
            <p className="text-gray-600 text-sm mt-1">Browse available positions</p>
            <button className="mt-3 text-blue-600 hover:underline">View jobs →</button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-gray-800">My Applications</h2>
            <p className="text-gray-600 text-sm mt-1">Track your job applications</p>
            <button className="mt-3 text-blue-600 hover:underline">View applications →</button>
          </CardBody>
        </Card>

        {user?.role === 'ADMIN' && (
          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
              <p className="text-gray-600 text-sm mt-1">Manage users and system</p>
              <button className="mt-3 text-blue-600 hover:underline">Go to Admin →</button>
            </CardBody>
          </Card>
        )}

        {user?.role === 'HR' && (
          <Card>
            <CardBody>
              <h2 className="text-lg font-semibold text-gray-800">HR Dashboard</h2>
              <p className="text-gray-600 text-sm mt-1">Post jobs and review candidates</p>
              <button className="mt-3 text-blue-600 hover:underline">Go to HR →</button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}