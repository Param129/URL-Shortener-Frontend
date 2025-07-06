import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            // Store the complete user object in Redux
            dispatch(login({user: data.user}));
            // Invalidate and refetch the currentUser query
            await queryClient.invalidateQueries({queryKey: ['currentUser']});
            // Force a refetch to ensure the latest data
            await queryClient.refetchQueries({queryKey: ['currentUser']});
            navigate({to: "/dashboard"});
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-900 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-purple-500 transform transition-all duration-500 hover:shadow-purple-500/30 hover:shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-purple-400 animate-pulse">Login</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/60 text-red-300 rounded-md border border-red-500 animate-pulse">
                        {error}
                    </div>
                )}

                <div className="mb-4 group">
                    <label className="block text-gray-300 text-sm font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-gray-800 transition-all duration-300"
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6 group">
                    <label className="block text-gray-300 text-sm font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-gray-800 transition-all duration-300"
                        id="password"
                        type="password"
                        placeholder="••••••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`relative overflow-hidden bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/50'}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <span className="relative z-10">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                </div>

                <div className="text-center mt-6">
                    <p className="cursor-pointer text-sm text-gray-400">
                        Don't have an account? <span onClick={() => state(false)} className="text-purple-400 hover:text-purple-300 transition-colors duration-300 hover:underline">Register</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-4 italic">Enter at your own risk. We're not responsible for your sanity.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
