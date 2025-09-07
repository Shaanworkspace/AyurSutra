import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PrescriptionModal = ({ isOpen, onClose, onSubmit, request, formData, onFormChange, mode }) => {
    if (!isOpen) return null;
    
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 m-4">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5 text-gray-600" /></button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{mode === 'edit' ? 'Edit Prescription for' : 'Create Prescription for'} {request?.patientName}</h2>
                        <p className="text-sm text-gray-500 mb-6">Fill in the details below to complete the consultation.</p>
                        <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label><textarea name="diagnosis" value={formData.diagnosis} onChange={onFormChange} rows="3" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" required /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Prescribed Medication</label><textarea name="prescribedTreatment" value={formData.prescribedTreatment} onChange={onFormChange} rows="3" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" /></div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Assign Therapy</label><select name="therapyName" value={formData.therapyName} onChange={onFormChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"><option>None</option><option>Abhyanga</option><option>Shirodhara</option><option>Virechana</option><option>Basti</option><option>Nasya</option></select></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label><input name="noOfDays" type="number" value={formData.noOfDays} onChange={onFormChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input name="startDate" type="date" value={formData.startDate} onChange={onFormChange} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label><textarea name="doctorNotes" value={formData.doctorNotes} onChange={onFormChange} rows="2" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" /></div>
                            <div className="flex justify-end pt-4"><button type="submit" className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">Save Prescription</button></div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PrescriptionModal;