import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white dark:bg-gray-800 shadow-xl border-b border-indigo-100 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="text-3xl font-black text-gray-900 dark:text-white mb-2 sm:mb-0 tracking-tighter hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Library Portal
        </Link>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/"
            aria-label="Home"
            className=" font-extrabold p-3 rounded-full text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors shadow-md"
          >
            <span>🏠 Home</span>
          </Link>
          <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                         focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </form>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors shadow-md"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          
          {user ? (
            <div className="flex space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white transition-colors">
                <span>👤</span>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-red-600 hover:text-white transition-colors"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md"
            >
              <span>👤</span>
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
