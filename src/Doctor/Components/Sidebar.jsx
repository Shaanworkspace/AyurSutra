import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react';

const SidebarLink = ({ icon: Icon, text, active }) => (
    <Link to="#" className={`flex items-center py-3 px-4 my-1 rounded-lg transition-colors ${active ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
        <Icon className="w-5 h-5 mr-3" />
        <span className="truncate">{text}</span>
    </Link>
);

const Sidebar = ({ doctor }) => {
    return (
        <aside className="hidden md:flex w-72 bg-white shadow-xl flex-shrink-0 flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="p-5 border-b flex items-center gap-4">
                <img src={doctor.avatarUrl} alt="Doctor Avatar" className="w-12 h-12 rounded-full border-2 border-emerald-300" />
                <div>
                    <p className="font-bold text-lg text-gray-900 leading-5">Dr. {doctor.firstName}</p>
                    
                </div>
            </div>
            <nav className="flex-1 p-3 overflow-auto">
                <SidebarLink icon={LayoutDashboard} text="Dashboard" active />
                <SidebarLink icon={Users} text="My Patients" />
                <SidebarLink icon={Calendar} text="My Schedule" />
                <SidebarLink icon={Settings} text="Settings" />
            </nav>
            <div className="p-4 border-t">
                <button className="w-full flex items-center justify-start gap-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;