import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Stethoscope, Pill, HeartPulse, Pencil } from 'lucide-react';

const PrescriptionDetailView = ({ record }) => ( <div className="space-y-4"><div className="p-4 bg-gray-100 rounded-lg"><h4 className="font-semibold text-gray-700 mb-2 text-sm">Patient's Reported Symptoms</h4><p className="text-gray-600 text-sm">{record.symptoms}</p></div><div className="p-4 bg-white rounded-lg border"><div className="flex items-center gap-3 mb-2"><Stethoscope className="w-5 h-5 text-emerald-600"/><h4 className="font-semibold text-gray-800">Diagnosis</h4></div><p className="text-gray-600 pl-8 text-sm">{record.diagnosis}</p></div><div className="p-4 bg-white rounded-lg border"><div className="flex items-center gap-3 mb-2"><Pill className="w-5 h-5 text-emerald-600"/><h4 className="font-semibold text-gray-800">Medication</h4></div><p className="text-gray-600 pl-8 text-sm whitespace-pre-line">{record.prescribedTreatment}</p></div><div className="p-4 bg-white rounded-lg border"><div className="flex items-center gap-3 mb-2"><HeartPulse className="w-5 h-5 text-emerald-600"/><h4 className="font-semibold text-gray-800">Therapy Plan</h4></div><div className="pl-8 text-sm grid grid-cols-2 gap-x-4 gap-y-1"><span className="text-gray-500">Therapy:</span><span className="text-gray-800 font-medium">{record.therapyName}</span><span className="text-gray-500">Duration:</span><span className="text-gray-800 font-medium">{record.noOfDays} Days</span><span className="text-gray-500">Start Date:</span><span className="text-gray-800 font-medium">{record.startDate}</span></div></div>{record.doctorNotes && ( <div className="p-4 bg-white rounded-lg border"><div className="flex items-center gap-3 mb-2"><Pencil className="w-5 h-5 text-emerald-600"/><h4 className="font-semibold text-gray-800">Doctor's Notes</h4></div><p className="text-gray-600 pl-8 text-sm">{record.doctorNotes}</p></div>)}</div> );

const HistoryDetailModal = ({ record, onClose, onFollowUp }) => {
    if (!record) return null;

    return (
        <AnimatePresence>
            {record && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-2xl bg-gray-50 rounded-2xl shadow-2xl p-6 m-4">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-600" /></button>
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Consultation History</h2>
                            <p className="text-sm text-gray-500">For {record.patientName} on {new Date(record.createdDate).toLocaleDateString()}</p>
                        </div>
                        <div className="max-h-[70vh] overflow-y-auto pr-2">
                            <PrescriptionDetailView record={record} />
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button onClick={() => onFollowUp(record)} className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-base">
                                <PlusCircle className="w-5 h-5"/>
                                Start Follow-up Consultation
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HistoryDetailModal;