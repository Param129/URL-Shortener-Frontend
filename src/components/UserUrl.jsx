import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-gray-400 ml-3 animate-pulse">Loading your URL graveyard...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-900/60 border border-red-500 text-red-300 px-4 py-3 rounded-lg my-4 animate-pulse">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Error loading your URLs: {error.message}</span>
        </div>
        <p className="text-xs mt-2 italic">Even our server is having an existential crisis.</p>
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-400 my-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <svg className="w-16 h-16 mx-auto text-gray-500 mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-xl font-medium text-indigo-400">No URLs found</p>
        <p className="mt-2">Your URL collection is as empty as your social calendar.</p>
        <p className="text-sm text-gray-500 mt-4">Create your first shortened URL above.</p>
      </div>
    )
  } 

  return (
    <div className="bg-gray-800/70 rounded-lg shadow-lg overflow-hidden border border-gray-700 transform transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800/90 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300 truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <a 
                      href={`https://url-shortner-backend-ow3q.onrender.com/${url.short_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200"
                    >
                      {`https://url-shortner-backend-ow3q.onrender.com/${url.short_url}`}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleCopy(`https://url-shortner-backend-ow3q.onrender.com/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                      copiedId === url._id
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <p className="text-xs text-gray-500 italic">
          Total URLs: {urls.urls.length} • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default UserUrl
