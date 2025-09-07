import React from 'react';

const OngoingTherapies = () => {
  const therapies = [
    { patient: 'Poppy Pop', therapy: 'Abhyanga (Full Body Massage)', progress: 75 },
    { patient: 'John Doe', therapy: 'Shirodhara', progress: 40 },
    { patient: 'Jane Smith', therapy: 'Swedana', progress: 60 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Ongoing Therapies</h3>
      <div className="space-y-4">
        {therapies.map((therapy, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-700">{therapy.patient}</p>
                <p className="text-sm text-gray-500">{therapy.therapy}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${therapy.progress}%` }}
              ></div>
            </div>
             <p className="text-right text-sm text-gray-500 mt-1">{therapy.progress}% Complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingTherapies;