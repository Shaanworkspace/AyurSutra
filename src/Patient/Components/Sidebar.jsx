import React from 'react';
import { LayoutDashboard, Calendar, MessageSquare, User as UserIcon, Settings, LogOut } from 'lucide-react';
import SidebarLink from './SidebarLink';

const Sidebar = ({ displayName, initials }) => (
  <aside className="hidden md:flex w-72 bg-white shadow-xl flex-shrink-0 flex flex-col h-[calc(100vh-6rem)] sticky top-24">
    <div className="p-5 border-b">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white grid place-items-center text-lg font-bold">
          {initials}
        </div>
        <div>
          <p className="font-bold text-lg text-gray-900 leading-5">{displayName}</p>
        </div>
      </div>
    </div>
    <nav className="flex-1 p-3 overflow-auto">
      <SidebarLink icon={LayoutDashboard} text="Dashboard" active />
      <SidebarLink icon={Calendar} text="My Schedule" />
      <SidebarLink icon={MessageSquare} text="Feedback" />
      <SidebarLink icon={UserIcon} text="Profile" />
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

export default Sidebar;