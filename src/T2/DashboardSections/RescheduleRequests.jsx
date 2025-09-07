import React from 'react';

const RescheduleRequests = () => {
    const requests = [
        { patient: 'Rohan Mehta', therapy: 'Shirodhara', from: 'Sep 9, 2:00 PM', to: 'Sep 10, 11:00 AM' },
        { patient: 'Sneha Gupta', therapy: 'Abhyanga', from: 'Sep 10, 4:00 PM', to: 'Sep 11, 4:00 PM' },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Reschedule Requests</h3>
            <div className="space-y-4">
                {requests.map((req, index) => (
                    <div key={index} className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
                        <p className="font-semibold text-gray-800">{req.patient} - <span className="font-normal text-gray-600">{req.therapy}</span></p>
                        <div className="text-sm mt-2">
                           <p>From: <span className="line-through text-red-500">{req.from}</span></p>
                           <p>To: <span className="font-semibold text-green-600">{req.to}</span></p>
                        </div>
                        <div className="flex justify-end space-x-3 mt-3">
                            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">Deny</button>
                            <button className="text-sm bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600">Approve</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RescheduleRequests;