/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const Chip = ({ children, tone = 'gray' }) => {
    const map = { amber: 'bg-amber-100 text-amber-700', green: 'bg-emerald-100 text-emerald-700' };
    return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[tone]}`}>{children}</span>;
};

const PatientRequestList = ({ requests, selectedRequest, onSelectRequest }) => {
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <motion.div variants={itemVariants} transition={{delay: 0.3}} className="lg:col-span-1 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-[60vh] flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Pending Requests</h2>
            <div className="flex-1 overflow-y-auto pr-2">
                {requests.length > 0 ? requests.map(request => (
                    <button key={request.id} onClick={() => onSelectRequest(request)} className={`w-full text-left p-4 rounded-xl mb-3 transition-all duration-300 border-2 ${selectedRequest?.id === request.id ? 'bg-green-50 border-emerald-400 shadow-md' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <p className="font-bold text-gray-800">{request.patientName}</p>
                            <Chip tone={'amber'}>{request.status}</Chip>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{request.symptoms}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(request.createdDate).toLocaleString()}</p>
                    </button>
                )) : (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <p>No pending requests. <br/> Great job!</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PatientRequestList;