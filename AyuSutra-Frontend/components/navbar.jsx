import React from 'react'

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-600">MyBrand</h1>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 text-green-600 font-medium">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">About</li>
          <li className="hover:text-gray-200 cursor-pointer">Services</li>
          <li className="hover:text-gray-200 cursor-pointer">Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">☰</button>
      </div>
    </nav>
  )
}
