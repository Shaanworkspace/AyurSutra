/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const PatientListPanel = ({ patients, selectedPatientId, onSelectPatient }) => {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 bg-white shadow-lg p-4 rounded-r-2xl border-r border-gray-200 overflow-y-auto"
        >
            <h2 className="text-lg font-bold text-gray-800 mb-4">Patients</h2>
            {patients.length > 0 ? (
                patients.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onSelectPatient(p.id)}
                        className={`block w-full text-left p-3 rounded-lg mb-2 transition-all ${selectedPatientId === p.id
                                ? "bg-emerald-100 text-emerald-700 font-semibold"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        <p>{p.name}</p>
                        <span className="text-xs text-gray-400">ID: {p.id}</span>
                    </button>
                ))
            ) : (
                <p className="text-gray-500 text-sm">No patients yet.</p>
            )}
        </motion.div>
    );
};

export default PatientListPanel;