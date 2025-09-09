import React, { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const RescheduleOptions = ({ therapistId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReschedules = async () => {
      try {
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/therapists/${therapistId}/reschedule-requests`
        );
        if (!res.ok) throw new Error("Failed to fetch reschedule requests");
        setRequests(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReschedules();
  }, [therapistId]);

  const handleApprove = async (req) => {
    await fetch(
      `https://ayusutra-backend.onrender.com/api/reschedules/${req.id}/approve`,
      { method: "PUT" }
    );
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  const handleDecline = async (req) => {
    await fetch(
      `https://ayusutra-backend.onrender.com/api/reschedules/${req.id}/decline`,
      { method: "PUT" }
    );
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  if (loading) return <div>Loading reschedules...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Reschedule Requests</h2>
      {requests.map((r) => (
        <div key={r.id} className="p-3 border rounded-lg mb-3">
          <div className="font-semibold">{r.patientName}</div>
          <div className="text-sm text-gray-600">
            From {r.originalDate} {r.originalTime}
            <br />
            To {r.requestedDate} {r.requestedTime}
          </div>
          <div className="space-x-2 mt-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => handleApprove(r)}
            >
              Approve
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => handleDecline(r)}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
      {requests.length === 0 && (
        <div className="text-gray-600">No reschedule requests</div>
      )}
    </div>
  );
};

export default RescheduleOptions;