import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24"> {/* Added pt-24 to account for fixed navbar */}
      <h1 className="text-4xl font-bold text-green-600 mb-8">Welcome to Your Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Patients */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Total Patients</h2>
          <p className="text-gray-800 text-3xl">1,234</p>
          <p className="text-gray-600 mt-2">Last updated: 2 hours ago</p>
        </div>

        {/* Card 2: Total Practitioners */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Total Practitioners</h2>
          <p className="text-gray-800 text-3xl">56</p>
          <p className="text-gray-600 mt-2">Last updated: 1 day ago</p>
        </div>

        {/* Card 3: Therapies Offered */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Therapies Offered</h2>
          <p className="text-gray-800 text-3xl">12</p>
          <p className="text-gray-600 mt-2">View all therapies</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Recent Activity</h2>
        <ul>
          <li className="border-b border-gray-200 py-3 text-gray-800">New patient registered: John Doe</li>
          <li className="border-b border-gray-200 py-3 text-gray-800">Appointment scheduled for Jane Smith</li>
          <li className="py-3 text-gray-800">Therapy "Panchakarma" updated</li>
        </ul>
      </div>
    </div>
  );
}