/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { chipClasses } from "./Chip";

const HistoryDetailModal = ({ open, onClose, item }) => {
  const navigate = useNavigate();

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-detail-title"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal container */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 
                      max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border 
                      border-gray-100 p-5 sm:p-6 md:p-7">

        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6l-12 12"
            />
          </svg>
        </button>

        {/* title */}
        <h3 id="history-detail-title" 
            className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          {item.therapyName || "Therapy"} Details
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Status:{" "}
          <span
            className={`inline-block px-2 py-0.5 rounded-full ${
              chipClasses[item.status] || chipClasses.Default
            }`}
          >
            {item.status}
          </span>
        </p>

        {/* Info grid… unchanged */}
        {/* … */}

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center 
                        justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 
                       text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          {/* ✅ Updated Open Record Button */}
          <button
            onClick={() => {
              // store the full record in localStorage (optional)
              localStorage.setItem(
                "selectedRecord",
                JSON.stringify(item.raw || item)
              );
              onClose();
              // navigate to patient record page
              navigate(`/patient/records/${item.raw?.id || item.id}`);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 
                       text-white hover:bg-emerald-700"
          >
            Open Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;