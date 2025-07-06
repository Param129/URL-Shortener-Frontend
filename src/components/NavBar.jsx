import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../api/user.api';
import { logout } from '../store/slice/authSlice.js';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Fix the user name extraction to handle both data structures
    const userName = user?.name || user?.user?.name || 'User';

    const handleLogout = async() => {
        try {
            await logoutUser();
            dispatch(logout());
            navigate({to:"/auth"});
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side - App Name */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold text-white hover:text-blue-200 transition-colors duration-300">
                            <span className="animate-bounce inline-block mr-2 text-2xl">✂️</span>
                            <span className="relative">
                                <span className="tracking-wider">URL Shortener</span>
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </span>
                        </Link>
                    </div>
                    
                    {/* Right side - Auth buttons */}
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                                    Welcome, 
                                    <span className="font-medium ml-1 text-yellow-300">{userName}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="relative overflow-hidden bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 group"
                                >
                                    <span className="relative z-10">Logout</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="relative overflow-hidden bg-white text-blue-600 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/30 group"
                            >
                                <span className="relative z-10">Login</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
