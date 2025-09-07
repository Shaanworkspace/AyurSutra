import React from 'react';
import { FiBell, FiMessageSquare, FiUser, FiMenu } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b">
      <div className="flex items-center">
        {/* Hamburger Menu Icon for mobile */}
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden">
          <FiMenu className="w-6 h-6" />
        </button>
        <div className="relative ml-4 md:ml-0">
          <h1 className="text-2xl font-bold text-gray-800">Namaste, Rahul! 👋</h1>
          <p className="text-gray-500">Here's what's happening today.</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <FiBell className="w-6 h-6 text-gray-600"/>
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <FiMessageSquare className="w-6 h-6 text-gray-600"/>
        </button>
         <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <FiUser className="w-6 h-6 text-gray-600"/>
        </button>
      </div>
    </header>
  );
};

export default Header;