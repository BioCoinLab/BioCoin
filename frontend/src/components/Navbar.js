import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './UI/DarkModeToggle';
import { useThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useThemeContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm transition-colors`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-green-500 font-bold text-2xl">BioCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${theme === 'dark' ? 'text-gray-200 hover:text-green-400' : 'text-gray-700 hover:text-green-500'} transition duration-300`}>
              Home
            </Link>
            <Link to="/dashboard" className={`${theme === 'dark' ? 'text-gray-200 hover:text-green-400' : 'text-gray-700 hover:text-green-500'} transition duration-300`}>
              Dashboard
            </Link>
            <Link to="/research" className={`${theme === 'dark' ? 'text-gray-200 hover:text-green-400' : 'text-gray-700 hover:text-green-500'} transition duration-300`}>
              Research
            </Link>
            <Link
              to="/profile"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              My Profile
            </Link>
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <DarkModeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/research"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={toggleMenu}
            >
              Research
            </Link>
            <Link
              to="/profile"
              className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              onClick={toggleMenu}
            >
              My Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 