import React, { useEffect, useState } from "react";

const OngoingTherapies = ({ therapistId }) => {
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoing = async () => {
      try {
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/therapists/${therapistId}/ongoing-therapies`
        );
        if (!res.ok) throw new Error("Failed to fetch ongoing therapies");
        setTherapies(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOngoing();
  }, [therapistId]);

  if (loading) return <div>Loading ongoing therapies...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4">Ongoing Therapies</h2>
      {therapies.map((t) => (
        <div key={t.id} className="p-3 border rounded mb-2">
          <div className="font-semibold">
            {t.patientName} — {t.therapyType}
          </div>
          <div className="text-sm text-gray-600">
            Started: {t.startDate}, Status: {t.status}
          </div>
        </div>
      ))}
      {therapies.length === 0 && (
        <div className="text-gray-500 text-sm">No ongoing therapies.</div>
      )}
    </div>
  );
};

export default OngoingTherapies;