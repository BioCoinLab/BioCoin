import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-xl mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound; 