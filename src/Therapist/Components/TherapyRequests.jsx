import React, { useState } from 'react';
import { CheckIcon, XMarkIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const TherapyRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: 'Deepika Rao',
      therapyType: 'Family Therapy',
      preferredDate: '2025-09-15',
      preferredTime: '10:00 AM',
      requestMessage: 'Need help with family communication issues. Urgent.',
      requestDate: '2025-09-06',
      priority: 'high',
      contact: '+91-9876543210'
    },
    {
      id: 2,
      patientName: 'Amit Kumar',
      therapyType: 'Career Counseling',
      preferredDate: '2025-09-12',
      preferredTime: '02:00 PM',
      requestMessage: 'Feeling confused about career direction after job loss.',
      requestDate: '2025-09-05',
      priority: 'medium',
      contact: '+91-8765432109'
    },
    {
      id: 3,
      patientName: 'Sneha Patel',
      therapyType: 'Anxiety Treatment',
      preferredDate: '2025-09-10',
      preferredTime: '11:00 AM',
      requestMessage: 'Experiencing panic attacks frequently. Need immediate help.',
      requestDate: '2025-09-07',
      priority: 'high',
      contact: '+91-7654321098'
    },
    {
      id: 4,
      patientName: 'Rajesh Mehta',
      therapyType: 'Relationship Counseling',
      preferredDate: '2025-09-18',
      preferredTime: '04:00 PM',
      requestMessage: 'Having issues with spouse. Looking for couple therapy.',
      requestDate: '2025-09-04',
      priority: 'medium',
      contact: '+91-6543210987'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const handleAccept = (request) => {
    setRequests(prev => prev.filter(r => r.id !== request.id));
    alert(`Accepted therapy request from ${request.patientName} for ${request.therapyType}`);
  };

  const handleReject = (request) => {
    setRequests(prev => prev.filter(r => r.id !== request.id));
    alert(`Rejected therapy request from ${request.patientName}`);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.therapyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    const requestDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - requestDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Patient Therapy Requests</h2>
          <p className="text-sm text-gray-600 mt-1">Review and manage new therapy requests</p>
        </div>
        <div className="text-sm text-gray-600">
          {filteredRequests.length} Pending Requests
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients or therapy types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <div key={request.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
            {/* Header with Priority */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold text-gray-900 text-lg">{request.patientName}</h3>
                {getPriorityIcon(request.priority)}
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium capitalize border
                  ${getPriorityColor(request.priority)}
                `}>
                  {request.priority} Priority
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {getDaysAgo(request.requestDate)}
              </div>
            </div>

            {/* Request Details */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Therapy Type</div>
                <div className="font-medium text-gray-900">{request.therapyType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Preferred Schedule</div>
                <div className="font-medium text-gray-900">
                  {formatDate(request.preferredDate)} at {request.preferredTime}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Patient Message</div>
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                "{request.requestMessage}"
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Contact</div>
              <div className="text-sm text-gray-900">{request.contact}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleAccept(request)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none justify-center"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Accept Request</span>
              </button>
              
              <button
                onClick={() => handleReject(request)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium flex-1 sm:flex-none justify-center"
              >
                <XMarkIcon className="h-4 w-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <CheckIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">
            {requests.length === 0 ? 'No pending therapy requests' : 'No requests match your search'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {requests.length === 0 ? 'New requests will appear here' : 'Try adjusting your search or filters'}
          </p>
        </div>
      )}

      {/* Summary */}
      {requests.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">High ({requests.filter(r => r.priority === 'high').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Medium ({requests.filter(r => r.priority === 'medium').length})</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Total: {requests.length} requests
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapyRequests;
