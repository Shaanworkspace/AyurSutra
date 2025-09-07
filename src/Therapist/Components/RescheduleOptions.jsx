import React, { useState } from 'react';
import { CheckIcon, XMarkIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';

const RescheduleOptions = () => {
  const [rescheduleRequests, setRescheduleRequests] = useState([
    {
      id: 1,
      patientName: 'Priya Sharma',
      originalDate: '2025-09-08',
      originalTime: '10:00 AM',
      requestedDate: '2025-09-09',
      requestedTime: '02:00 PM',
      reason: 'Work conflict - important meeting scheduled',
      requestDate: '2025-09-06',
      therapyType: 'CBT Session',
      sessionNumber: 9
    },
    {
      id: 2,
      patientName: 'Arjun Nair',
      originalDate: '2025-09-09',
      originalTime: '11:00 AM',
      requestedDate: '2025-09-10',
      requestedTime: '03:00 PM',
      reason: 'Medical emergency in family',
      requestDate: '2025-09-07',
      therapyType: 'Anxiety Counseling',
      sessionNumber: 5
    },
    {
      id: 3,
      patientName: 'Kavya Reddy',
      originalDate: '2025-09-10',
      originalTime: '09:00 AM',
      requestedDate: '2025-09-11',
      requestedTime: '10:00 AM',
      reason: 'Travel delay - flight got postponed',
      requestDate: '2025-09-08',
      therapyType: 'Depression Therapy',
      sessionNumber: 12
    },
    {
      id: 4,
      patientName: 'Manish Joshi',
      originalDate: '2025-09-11',
      originalTime: '04:00 PM',
      requestedDate: '2025-09-12',
      requestedTime: '11:00 AM',
      reason: 'Child\'s school emergency',
      requestDate: '2025-09-07',
      therapyType: 'Stress Management',
      sessionNumber: 3
    }
  ]);

  const handleApprove = (request) => {
    setRescheduleRequests(prev => prev.filter(r => r.id !== request.id));
    alert(`Approved reschedule for ${request.patientName} from ${request.originalDate} ${request.originalTime} to ${request.requestedDate} ${request.requestedTime}`);
  };

  const handleDecline = (request) => {
    setRescheduleRequests(prev => prev.filter(r => r.id !== request.id));
    alert(`Declined reschedule request from ${request.patientName}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    const requestDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - requestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  const isUrgent = (originalDate) => {
    const original = new Date(originalDate);
    const today = new Date();
    const diffTime = original - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2; // Urgent if original appointment is within 2 days
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Therapy Reschedule Requests</h2>
          <p className="text-sm text-gray-600 mt-1">Manage appointment rescheduling requests</p>
        </div>
        <div className="text-sm text-gray-600">
          {rescheduleRequests.length} Pending Requests
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {rescheduleRequests.map(request => (
          <div key={request.id} className={`
            border-2 rounded-lg p-5 transition-all duration-200 hover:shadow-md
            ${isUrgent(request.originalDate) 
              ? 'border-orange-200 bg-orange-50' 
              : 'border-gray-200 bg-white'
            }
          `}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-900 text-lg">{request.patientName}</h3>
                {isUrgent(request.originalDate) && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full border border-orange-200">
                    Urgent
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Requested {getDaysAgo(request.requestDate)}
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{request.therapyType}</span>
                <span className="text-xs text-gray-600">• Session {request.sessionNumber}</span>
              </div>
            </div>

            {/* Schedule Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Original Schedule */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm font-medium text-red-800 mb-2">Original Schedule</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">{formatDate(request.originalDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-700">{request.originalTime}</span>
                  </div>
                </div>
              </div>

              {/* Requested Schedule */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-medium text-green-800 mb-2">Requested Schedule</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">{formatDate(request.requestedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">{request.requestedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Reason for Reschedule</div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 italic">"{request.reason}"</p>
              </div>
            </div>

            {/* Conflict Check */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-blue-800">No conflicts detected for requested time</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleApprove(request)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none justify-center"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Approve Reschedule</span>
              </button>
              
              <button
                onClick={() => handleDecline(request)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none justify-center"
              >
                <XMarkIcon className="h-4 w-4" />
                <span>Decline</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {rescheduleRequests.length === 0 && (
        <div className="text-center py-8">
          <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No pending reschedule requests</p>
          <p className="text-sm text-gray-500 mt-1">Patient reschedule requests will appear here</p>
        </div>
      )}

      {/* Summary */}
      {rescheduleRequests.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">
                Urgent ({rescheduleRequests.filter(r => isUrgent(r.originalDate)).length})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Regular ({rescheduleRequests.filter(r => !isUrgent(r.originalDate)).length})
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Total: {rescheduleRequests.length} requests
          </div>
        </div>
      )}
    </div>
  );
};

export default RescheduleOptions;
