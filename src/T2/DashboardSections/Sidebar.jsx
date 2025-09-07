import React from 'react';
import { FiGrid, FiCalendar, FiUserCheck, FiSettings, FiLogOut, FiX } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 flex flex-col w-[90%] md:w-64 h-screen px-4 py-8 bg-white border-r transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}
    >
      <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-semibold text-green-600">
            AyurSutra
          </h2>
          {/* Close button for mobile */}
          <button className='md:hidden' onClick={() => setSidebarOpen(false)}>
            <FiX className='w-6 h-6 text-gray-600'/>
          </button>
      </div>
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
        <h4 className="mx-2 mt-2 font-medium text-gray-800">Rahul Verma</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600">Therapist</p>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md" href="#">
            <FiGrid className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-100" href="#">
            <FiCalendar className="w-5 h-5" />
            <span className="mx-4 font-medium">My Schedule</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-100" href="#">
            <FiUserCheck className="w-5 h-5" />
            <span className="mx-4 font-medium">Patients</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-100" href="#">
            <FiSettings className="w-5 h-5" />
            <span className="mx-4 font-medium">Settings</span>
          </a>
        </nav>
        <div className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-100 cursor-pointer">
            <FiLogOut className="w-5 h-5 text-red-500" />
            <span className="mx-4 font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;