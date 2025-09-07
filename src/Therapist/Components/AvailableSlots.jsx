import React, { useState } from 'react';
import { PlusIcon, ClockIcon } from '@heroicons/react/24/outline';

const AvailableSlots = () => {
  const [selectedDate, setSelectedDate] = useState('2025-09-08');
  const [slots] = useState([
    { id: 1, date: '2025-09-08', time: '09:00 AM', status: 'available', duration: 60 },
    { id: 2, date: '2025-09-08', time: '10:00 AM', status: 'booked', duration: 60, patient: 'John Doe' },
    { id: 3, date: '2025-09-08', time: '11:00 AM', status: 'available', duration: 60 },
    { id: 4, date: '2025-09-08', time: '02:00 PM', status: 'available', duration: 60 },
    { id: 5, date: '2025-09-08', time: '03:00 PM', status: 'unavailable', duration: 60 },
    { id: 6, date: '2025-09-09', time: '09:00 AM', status: 'available', duration: 60 },
    { id: 7, date: '2025-09-09', time: '10:00 AM', status: 'available', duration: 60 },
    { id: 8, date: '2025-09-09', time: '11:00 AM', status: 'booked', duration: 60, patient: 'Sarah Smith' }
  ]);

  const dates = ['2025-09-08', '2025-09-09', '2025-09-10', '2025-09-11'];
  const filteredSlots = slots.filter(slot => slot.date === selectedDate);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'unavailable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✓';
      case 'booked': return '●';
      case 'unavailable': return '✕';
      default: return '●';
    }
  };

  const handleAddSlot = () => {
    alert('Add new slot functionality would be implemented here');
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      alert(`Book slot: ${slot.time} on ${slot.date}`);
    } else if (slot.status === 'booked') {
      alert(`View booking details for ${slot.patient} at ${slot.time}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Available Slots</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your appointment availability</p>
        </div>
        <button
          onClick={handleAddSlot}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Slot</span>
        </button>
      </div>

      {/* Date Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {dates.map(date => {
          const dateObj = new Date(date);
          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNumber = dateObj.getDate();

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`
                flex flex-col items-center px-4 py-3 rounded-lg min-w-[80px] transition-colors duration-200
                ${selectedDate === date
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <span className="text-xs font-medium">{dayName}</span>
              <span className="text-lg font-bold">{dayNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredSlots.map(slot => (
          <div
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
              ${getStatusColor(slot.status)}
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span className="font-semibold text-sm">{slot.time}</span>
              </div>
              <span className="text-lg">{getStatusIcon(slot.status)}</span>
            </div>

            <div className="text-xs">
              <div className="font-medium capitalize mb-1">{slot.status}</div>
              {slot.patient && (
                <div className="text-gray-600 truncate">{slot.patient}</div>
              )}
              <div className="text-gray-500">{slot.duration} min</div>
            </div>
          </div>
        ))}
      </div>

      {filteredSlots.length === 0 && (
        <div className="text-center py-8">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No slots available for selected date</p>
          <button
            onClick={handleAddSlot}
            className="mt-3 text-green-600 hover:text-green-700 font-medium"
          >
            Add your first slot
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-xs text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-600">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span className="text-xs text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default AvailableSlots;
