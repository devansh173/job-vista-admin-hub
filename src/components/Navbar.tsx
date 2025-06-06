
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-md flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-12"></div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link 
            to="/home" 
            className={`text-gray-700 hover:text-gray-900 font-medium ${
              isActive('/home') ? 'text-gray-900' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            className={`text-gray-700 hover:text-gray-900 font-medium ${
              isActive('/') || isActive('/jobs') ? 'text-gray-900' : ''
            }`}
          >
            Find Jobs
          </Link>
          <span className="text-gray-700 hover:text-gray-900 font-medium cursor-pointer">
            Find Talents
          </span>
          <span className="text-gray-700 hover:text-gray-900 font-medium cursor-pointer">
            About us
          </span>
          <span className="text-gray-700 hover:text-gray-900 font-medium cursor-pointer">
            Testimonials
          </span>
        </div>

        {/* Create Jobs Button */}
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium">
          Create Jobs
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
