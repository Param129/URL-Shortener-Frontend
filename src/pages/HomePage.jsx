import React, { useEffect, useState } from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-700/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 -right-10 w-80 h-80 bg-indigo-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-blue-500/30 w-full max-w-md transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:shadow-blue-500/20 hover:shadow-lg`}>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <h1 className="text-3xl font-bold text-center text-white">
              <span className="text-blue-400">URL</span>
              <span className="text-indigo-400">Shortener</span>
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-float">
              <span className="text-xs font-bold text-white">✂️</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-center mb-6 italic">Cut the fat. Keep the link.</p>
        <UrlForm />
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need to track your shortened URLs?{' '}
            <a href="/auth" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
              Sign in
            </a>{' '}
            or{' '}
            <a href="/auth" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 hover:underline">
              Create an account
            </a>
          </p>
          <p className="text-xs text-gray-600 mt-4 italic">
            We make your URLs shorter, not your life expectancy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage