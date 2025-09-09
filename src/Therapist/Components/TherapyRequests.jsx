import React, { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TherapyRequests = ({ therapistId }) => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/therapists/${therapistId}/therapy-requests`
        );
        if (!res.ok) throw new Error("Failed to fetch therapy requests");
        setRequests(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [therapistId]);

  if (loading) return <div>Loading therapy requests...</div>;

  const handleAccept = async (request) => {
    await fetch(
      `https://ayusutra-backend.onrender.com/api/requests/${request.id}/accept`,
      { method: "PUT" }
    );
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const handleReject = async (request) => {
    await fetch(
      `https://ayusutra-backend.onrender.com/api/requests/${request.id}/reject`,
      { method: "PUT" }
    );
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.therapyType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || request.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Patient Therapy Requests</h2>
      {/* search + filter */}
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Search requests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="border p-2 rounded mb-4"
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
      </select>

      {filteredRequests.map((req) => (
        <div
          key={req.id}
          className="p-3 border rounded-lg mb-3 flex justify-between"
        >
          <div>
            <div className="font-semibold">{req.patientName}</div>
            <div className="text-sm text-gray-600">{req.therapyType}</div>
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => handleAccept(req)}
            >
              Accept
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => handleReject(req)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TherapyRequests;