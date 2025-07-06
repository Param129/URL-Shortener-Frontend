import React, { useState, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [login, setLogin] = useState(true)
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
                <div className="absolute top-3/4 -right-10 w-80 h-80 bg-teal-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-pink-700/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Logo or title */}
            <div className={`mb-8 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-4xl font-bold text-white text-center">
                    <span className="text-purple-400">URL</span>
                    <span className="text-teal-400">Shortener</span>
                </h1>
                <p className="text-gray-400 text-center mt-2 italic">Where long URLs come to die.</p>
            </div>
            
            {/* Form container with transition */}
            <div className={`w-full max-w-md transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
            </div>
            
            {/* Footer */}
            <div className={`mt-8 text-center text-gray-500 text-xs transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
                &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.<br/>
                <span className="italic">We promise not to steal your data. Probably.</span>
            </div>
        </div>
    )
} 

export default AuthPage