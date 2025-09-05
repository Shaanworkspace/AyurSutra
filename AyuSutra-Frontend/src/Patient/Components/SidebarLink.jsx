import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ icon: Icon, text, active }) => (
  <Link
    to="#"
    className={`flex items-center py-3 px-4 my-1 rounded-lg transition-colors ${active ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="truncate">{text}</span>
  </Link>
);

export default SidebarLink;