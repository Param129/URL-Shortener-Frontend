import React, { useState } from 'react';
import { registerUser } from '../api/user.api.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

const RegisterForm = ({state}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();    
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      // Store the complete user object in Redux
      dispatch(login({user: {name, email}}));
      // Invalidate and refetch the currentUser query
      await queryClient.invalidateQueries({queryKey: ['currentUser']});
      // Force a refetch to ensure the latest data
      await queryClient.refetchQueries({queryKey: ['currentUser']});
      setTimeout(() => {
        navigate({to: "/dashboard"});
        setLoading(false);
    }, 100);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-teal-500 transform transition-all duration-500 hover:shadow-teal-500/30 hover:shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-teal-400 animate-pulse">Create an Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/60 text-red-300 rounded-md border border-red-500 animate-pulse">
            {error}
          </div>
        )}
        
        <div className="mb-4 group">
          <label className="block text-gray-300 text-sm font-bold mb-2 group-hover:text-teal-400 transition-colors duration-300" htmlFor="name">
            Full Name
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 bg-gray-800 transition-all duration-300"
            id="name"
            type="text"
            placeholder="Your Name (or alias, we won't judge)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4 group">
          <label className="block text-gray-300 text-sm font-bold mb-2 group-hover:text-teal-400 transition-colors duration-300" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 bg-gray-800 transition-all duration-300"
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6 group">
          <label className="block text-gray-300 text-sm font-bold mb-2 group-hover:text-teal-400 transition-colors duration-300" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 bg-gray-800 transition-all duration-300"
            id="password"
            type="password"
            placeholder="••••••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1 italic">Must be at least 6 characters. Like your chances of survival.</p>
        </div>
    
        <div className="flex items-center justify-between">
          <button
            className={`relative overflow-hidden bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-teal-500/50'}`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="relative z-10">
              {loading ? 'Creating...' : 'Create Account'}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="cursor-pointer text-sm text-gray-400">
            Already have an account? <span onClick={()=>state(true)} className="text-teal-400 hover:text-teal-300 transition-colors duration-300 hover:underline">Sign In</span>
          </p>
          <p className="text-xs text-gray-500 mt-4 italic">By registering, you agree to sell your soul. Terms and conditions apply.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
