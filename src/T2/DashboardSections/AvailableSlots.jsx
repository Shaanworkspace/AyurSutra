import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

const AvailableSlots = () => {
  const slots = [
    { day: 'Today', time: '04:00 PM - 05:00 PM', status: 'Booked' },
    { day: 'Tomorrow', time: '10:00 AM - 11:00 AM', status: 'Available' },
    { day: 'Tomorrow', time: '02:00 PM - 03:00 PM', status: 'Available' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Available Slots</h3>
        <button className="flex items-center text-sm text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg">
          <FiPlusCircle className="mr-2"/> Add New Slot
        </button>
      </div>
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-700">{slot.day}</p>
              <p className="text-sm text-gray-500">{slot.time}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              slot.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {slot.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;