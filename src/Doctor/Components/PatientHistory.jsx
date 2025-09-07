import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';

const PatientHistory = ({ historyRecords, onViewHistory }) => {
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    // 1. State to hold the search term
    const [searchTerm, setSearchTerm] = useState('');

    // 2. Filter records based on the search term
    // useMemo ensures this expensive filtering only runs when the search term or records change
    const filteredRecords = useMemo(() => {
        if (!searchTerm) {
            return historyRecords; // If search is empty, return all records
        }
        return historyRecords.filter(record =>
            record.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, historyRecords]);

    return (
        <motion.div variants={itemVariants} className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Patient Consultation History</h2>
                <div className="relative w-full max-w-xs">
                    {/* 3. Connect the input to the state */}
                    <input
                        type="text"
                        placeholder="Search by patient name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
            </div>
            
            {/* 4. Render the filtered list */}
            {filteredRecords.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredRecords.map(record => (
                        <motion.div 
                            key={record.id}
                            layout // Adds animation when items re-order or are removed
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }} 
                            className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col transition-all hover:border-emerald-300"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-gray-800">{record.patientName}</p>
                                    <p className="text-xs text-gray-500">Age: {record.patientAge}</p>
                                </div>
                                <p className="text-xs text-gray-400">{new Date(record.createdDate).toLocaleDateString()}</p>
                            </div>
                            <p className="text-sm text-gray-500 flex-1 my-2">
                                <strong className="text-gray-600 font-medium">Diagnosis:</strong> 
                                <span className="line-clamp-2">{record.diagnosis}</span>
                            </p>
                            <div className="border-t border-gray-200 mt-3 pt-3">
                                <button onClick={() => onViewHistory(record)} className="w-full flex justify-center items-center gap-1 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                                    View Details <ChevronRight className="w-4 h-4"/>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 col-span-full">
                    {historyRecords.length > 0 ? `No results found for "${searchTerm}".` : "No completed consultations in history."}
                </div>
            )}
        </motion.div>
    );
};

export default PatientHistory;