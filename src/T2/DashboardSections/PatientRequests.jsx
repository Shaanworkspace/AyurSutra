import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const PatientRequests = () => {
  const requests = [
    { name: 'Aarav Sharma', therapy: 'Panchakarma Consultation', symptoms: 'Chronic back pain' },
    { name: 'Priya Singh', therapy: 'Abhyanga', symptoms: 'Stress and anxiety' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">New Patient Requests</h3>
      <div className="space-y-4">
        {requests.map((req, index) => (
          <div key={index} className="p-4 bg-green-50 rounded-lg">
            <p className="font-semibold text-gray-800">{req.name}</p>
            <p className="text-sm text-gray-600">Wants to book: <span className="font-medium text-green-700">{req.therapy}</span></p>
            <p className="text-sm text-gray-500 mt-1">Symptoms: {req.symptoms}</p>
            <div className="flex justify-end space-x-3 mt-4">
              <button className="flex items-center text-sm bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
                <FiX className="mr-1" /> Reject
              </button>
              <button className="flex items-center text-sm bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600">
                <FiCheck className="mr-1" /> Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRequests;