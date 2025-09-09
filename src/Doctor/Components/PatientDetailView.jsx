/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon, 
  Pencil, 
  Stethoscope, 
  Pill, 
  HeartPulse 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const PrescriptionDetailView = ({ record }) => (
  <div className="space-y-3">
    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3 mb-2">
        <Stethoscope className="w-5 h-5 text-emerald-600"/>
        <h4 className="font-semibold text-gray-800">Diagnosis</h4>
      </div>
      <p className="text-gray-600 pl-8 text-sm">{record.diagnosis}</p>
    </div>

    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3 mb-2">
        <Pill className="w-5 h-5 text-emerald-600"/>
        <h4 className="font-semibold text-gray-800">Medication</h4>
      </div>
      <p className="text-gray-600 pl-8 text-sm whitespace-pre-line">
        {record.prescribedTreatment}
      </p>
    </div>

    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3 mb-2">
        <HeartPulse className="w-5 h-5 text-emerald-600"/>
        <h4 className="font-semibold text-gray-800">Therapy Plan</h4>
      </div>
      <div className="pl-8 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
        <span className="text-gray-500">Therapy:</span>
        <span className="text-gray-800 font-medium">{record.therapyName}</span>

        <span className="text-gray-500">Duration:</span>
        <span className="text-gray-800 font-medium">{record.noOfDays} Days</span>

        <span className="text-gray-500">Start Date:</span>
        <span className="text-gray-800 font-medium">{record.startDate}</span>
      </div>
    </div>

    {record.doctorNotes && (
      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-3 mb-2">
          <Pencil className="w-5 h-5 text-emerald-600"/>
          <h4 className="font-semibold text-gray-800">Doctor's Notes</h4>
        </div>
        <p className="text-gray-600 pl-8 text-sm">{record.doctorNotes}</p>
      </div>
    )}
  </div>
);


const PatientDetailView = ({ request, onWritePrescription, onEditPrescription }) => {
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={itemVariants} 
      transition={{delay: 0.4}} 
      className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[60vh]"
    >
      {request ? (
        <div>
          {/* Header */}
          <div className="pb-4 border-b border-gray-200 mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{request.patientName}</h2>
              <span className="text-sm text-gray-500">ID: {request.patientId}</span>
            </div>
            <p className="text-sm text-gray-600">
              {request.patientAge}, {request.patientGender}
            </p>
          </div>

          {/* Symptoms */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-700">Symptoms Reported:</h3>
              <p className="text-xs text-gray-400">
                {request.createdDate ? new Date(request.createdDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
              {request.symptoms}
            </div>
            {/* ✅ Edit Medical Record button */}
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => navigate(`/medical-records/${request.id}/edit`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 
                           text-white text-sm rounded-lg shadow transition-colors"
              >
                ✏️ Edit Medical Record
              </button>
            </div>
          </div>

          {/* Attachments */}
          {request.attachments && request.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Medical Attachments:</h3>
              <div className="flex flex-wrap gap-3">
                {request.attachments.map(file => (
                  <a
                    href={file.url}
                    key={file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-2 
                               rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
                  >
                    {file.type === 'pdf' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                    <span>{file.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Prescription Section */}
          <div className="mt-6">
            {request.status === 'Pending Review' ? (
              <div className="text-center bg-amber-50 p-6 rounded-lg">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-amber-800">Action Required</h3>
                <p className="text-amber-700 text-sm mb-4">
                  This patient is awaiting your diagnosis and prescription.
                </p>
                <button 
                  onClick={onWritePrescription}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold 
                             px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Write Prescription
                </button>
              </div>
            ) : (
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-green-500"/>
                    <h3 className="text-lg font-semibold text-green-800">Prescription Completed</h3>
                  </div>
                  {/* inline edit still available */}
                  <button 
                    onClick={() => onEditPrescription(request)}
                    className="flex items-center gap-2 bg-white text-gray-600 px-3 py-2 rounded-lg text-sm 
                               font-medium hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <Pencil className="w-4 h-4"/>
                    <span>Edit (Modal)</span>
                  </button>
                </div>
                <PrescriptionDetailView record={request} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-center text-gray-500">
          <p>No pending requests to display.</p>
        </div>
      )}
    </motion.div>
  );
};

export default PatientDetailView;