import React, { useState } from 'react';
import { EyeIcon, PencilSquareIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const OngoingTherapies = () => {
  const [therapies] = useState([
    {
      id: 1,
      patientName: 'Priya Sharma',
      therapyType: 'Cognitive Behavioral Therapy',
      sessionNumber: 8,
      totalSessions: 12,
      progress: 67,
      status: 'on-track',
      nextSession: '2025-09-10',
      startDate: '2025-07-15'
    },
    {
      id: 2,
      patientName: 'Rahul Verma',
      therapyType: 'Anxiety Management',
      sessionNumber: 4,
      totalSessions: 10,
      progress: 40,
      status: 'attention-needed',
      nextSession: '2025-09-09',
      startDate: '2025-08-01'
    },
    {
      id: 3,
      patientName: 'Anita Gupta',
      therapyType: 'Depression Counseling',
      sessionNumber: 15,
      totalSessions: 20,
      progress: 75,
      status: 'on-track',
      nextSession: '2025-09-11',
      startDate: '2025-06-01'
    },
    {
      id: 4,
      patientName: 'Vikram Singh',
      therapyType: 'Stress Management',
      sessionNumber: 6,
      totalSessions: 8,
      progress: 75,
      status: 'on-track',
      nextSession: '2025-09-12',
      startDate: '2025-08-15'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'attention-needed': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-500';
      case 'attention-needed': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleViewDetails = (therapy) => {
    alert(`View details for ${therapy.patientName}'s ${therapy.therapyType} sessions`);
  };

  const handleUpdateProgress = (therapy) => {
    alert(`Update progress for ${therapy.patientName} - Session ${therapy.sessionNumber + 1}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Ongoing Therapies</h2>
          <p className="text-sm text-gray-600 mt-1">Track active therapy sessions</p>
        </div>
        <div className="text-sm text-gray-600">
          {therapies.length} Active Sessions
        </div>
      </div>

      {/* Therapies List */}
      <div className="space-y-4">
        {therapies.map(therapy => (
          <div key={therapy.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
            {/* Patient Info & Status */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{therapy.patientName}</h3>
                <p className="text-gray-600 text-sm">{therapy.therapyType}</p>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium capitalize
                ${getStatusColor(therapy.status)}
              `}>
                {therapy.status.replace('-', ' ')}
              </span>
            </div>

            {/* Progress Section */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">
                  Session {therapy.sessionNumber} of {therapy.totalSessions}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {therapy.progress}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(therapy.status)}`}
                  style={{ width: `${therapy.progress}%` }}
                />
              </div>
            </div>

            {/* Session Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>Next: {formatDate(therapy.nextSession)}</span>
                </div>
                <div>
                  Started: {formatDate(therapy.startDate)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleViewDetails(therapy)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Details</span>
              </button>
              
              <button
                onClick={() => handleUpdateProgress(therapy)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
              >
                <PencilSquareIcon className="h-4 w-4" />
                <span>Update Progress</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {therapies.length === 0 && (
        <div className="text-center py-8">
          <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No ongoing therapies</p>
          <p className="text-sm text-gray-500 mt-1">Active therapy sessions will appear here</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div className="flex space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">On Track ({therapies.filter(t => t.status === 'on-track').length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Needs Attention ({therapies.filter(t => t.status === 'attention-needed').length})</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Avg Progress: {Math.round(therapies.reduce((acc, t) => acc + t.progress, 0) / therapies.length)}%
        </div>
      </div>
    </div>
  );
};

export default OngoingTherapies;
