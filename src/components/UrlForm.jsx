import React, { useState } from 'react'
import {useQuery,useQueryClient} from "@tanstack/react-query" 
import {useDispatch, useSelector} from 'react-redux';
import { createShortUrlFromFrontend } from '../api/shortUrl.api';
import { queryClient } from '../main';

const UrlForm = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [customSlug, setCustomSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const {isAuthenticated} = useSelector((state) => state.auth)

    const handleSubmit = async() => {
        if (!url) {
            setError("Please enter a URL");
            return;
        }
        
        setLoading(true);
        try{
            const shorturl = await createShortUrlFromFrontend(url, customSlug);
            setShortUrl(shorturl.url);
            queryClient.invalidateQueries({queryKey:['userUrls']})
            setError(null);
            setLoading(false);
        }
        catch(err){
            setError(err.message);
            setLoading(false);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
    }

  return (
    <div className="space-y-4">
        <div className="group">
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1 group-hover:text-blue-400 transition-colors duration-300">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com/this-is-way-too-long"
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-200 transition-all duration-300"
          />
        </div>
        
        {isAuthenticated && (
          <div className="mt-4 group">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300 mb-1 group-hover:text-blue-400 transition-colors duration-300">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug (e.g., my-awesome-link)"
              className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-200 transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-1 italic">Make it memorable. Unlike your ex.</p>
          </div>
        )}
        
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className={`relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/30'}`}
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Shorten URL
              </>
            )}
          </span>
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/60 text-red-300 rounded-md border border-red-500 animate-pulse">
            {error}
          </div>
        )}
        
        {shortUrl && (
          <div className="mt-6 bg-gray-800/70 p-4 rounded-lg border border-blue-500/30 transform transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20">
            <h2 className="text-lg font-semibold mb-2 text-blue-400">Your shortened URL:</h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-3 border border-gray-700 rounded-l-md bg-gray-800 text-gray-200"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-3 rounded-r-md transition-all duration-300 ${
                  copied 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic">Share it before it's cool.</p>
          </div>
        )}
      </div>
  )
}

export default UrlForm