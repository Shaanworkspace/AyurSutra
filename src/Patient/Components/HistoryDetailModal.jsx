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
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6 md:p-7">

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
                <h3 id="history-detail-title" className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {item.therapyName || "Therapy"} Details
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Status:{" "}
                    <span
                        className={`inline-block px-2 py-0.5 rounded-full ${chipClasses[item.status] || chipClasses.Default
                            }`}
                    >
                        {item.status}
                    </span>
                </p>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">Start date</p>
                        <p className="text-sm font-medium text-gray-900">{item.startDate ?? "—"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">End date</p>
                        <p className="text-sm font-medium text-gray-900">{item.endDate ?? "—"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">Days</p>
                        <p className="text-sm font-medium text-gray-900">{item.days ?? "—"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">Doctor</p>
                        <p className="text-sm font-medium text-gray-900">{item.doctorName || "—"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">Location/Room</p>
                        <p className="text-sm font-medium text-gray-900">{item.location || "—"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">Therapist</p>
                        <p className="text-sm font-medium text-gray-900">{item.therapistName || "—"}</p>
                    </div>
                </div>

                {/* Notes & Symptoms */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">
                            {item.notes?.trim() || "No additional notes."}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 mb-1">Symptoms</p>
                        {Array.isArray(item.symptomsList) && item.symptomsList.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm text-gray-800 space-y-0.5">
                                {item.symptomsList.map((sym, i) => (
                                    <li key={i}>{sym}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                {item.symptoms?.trim() || "—"}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Close
                    </button>

                    {/* Open Record Button → Saves record + navigates */}
                    <button
                        onClick={() => {
                            // save the raw full medical record into localStorage
                            localStorage.setItem("selectedRecord", JSON.stringify(item.raw || item));
                            onClose();
                            // use numeric id for API route
                            navigate(`/medical-records/${item.raw?.id || item.id}`);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        Open record
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryDetailModal;