import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-green-500 font-bold text-2xl">BioCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-500 transition duration-300">
              Home
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-green-500 transition duration-300">
              Dashboard
            </Link>
            <Link to="/research" className="text-gray-700 hover:text-green-500 transition duration-300">
              Research
            </Link>
            <Link
              to="/profile"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              My Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-500 focus:outline-none"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-500 transition duration-300"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-green-500 transition duration-300"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/research"
                className="text-gray-700 hover:text-green-500 transition duration-300"
                onClick={toggleMenu}
              >
                Research
              </Link>
              <Link
                to="/profile"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                onClick={toggleMenu}
              >
                My Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 