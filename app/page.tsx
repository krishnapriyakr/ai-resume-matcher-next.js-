// app/page.tsx

import Link from 'next/link'
import { ArrowRight, Sparkles, FileText, Briefcase, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Recruitment Platform</span>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Smart Resume Parsing &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Job Matching
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Upload resumes, let AI extract skills and experience, and match candidates with the perfect job opportunities instantly.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <FileText className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Resume Parsing</h3>
            <p className="text-slate-600">Automatically extract skills, experience, and education from PDF/DOCX resumes.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Briefcase className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Job Matching</h3>
            <p className="text-slate-600">AI-powered matching algorithm finds the best candidates for each role.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Zap className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Insights</h3>
            <p className="text-slate-600">Get match scores, skill gaps, and candidate summaries in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  )
}