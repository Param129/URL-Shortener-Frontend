import React, { useEffect, useState } from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 -right-10 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-indigo-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl border border-indigo-500/30 w-full max-w-4xl transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:shadow-indigo-500/20 hover:shadow-lg`}>
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <h1 className="text-3xl font-bold text-center text-white">
              <span className="text-purple-400">URL</span>
              <span className="text-blue-400">Shortener</span>
              <span className="text-indigo-400"> Dashboard</span>
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center animate-spin-slow">
              <span className="text-xs font-bold text-white">⚙️</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-center mb-6 italic">Your personal URL guillotine. Off with their heads!</p>
        
        <div className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
          <UrlForm />
        </div>
        
        <div className={`mt-8 transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
          <h2 className="text-xl font-bold text-indigo-400 mb-4">Your Shortened URLs</h2>
          <UserUrl />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage