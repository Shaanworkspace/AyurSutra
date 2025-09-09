/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { LoadingPage } from "@/components/Pages/LoadingPage";

const MedicalRecordEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch record + therapies list
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/medical-records/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch record");
        setRecord(await res.json());
      } catch (e) {
        console.error(e);
        setMessage("Error " + e.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTherapies = async () => {
      try {
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/specializations`
        );
        if (!res.ok) throw new Error("Failed to fetch therapies");
        setTherapies(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecord();
    fetchTherapies();
  }, [id]);

  // generic handleChange for other text fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecord((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // sanitize payload: only send therapy IDs
      const payload = {
        ...record,
        requiredTherapy: (record.requiredTherapy || []).map((t) => ({
          id: t.id,
        })),
      };

      const res = await fetch(
        `https://ayusutra-backend.onrender.com/api/medical-records/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setMessage("✅ Record updated successfully!");
      setTimeout(() => navigate("/doctor-dashboard"), 2000);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div>
        <LoadingPage />
      </div>
    );
  if (!record) return <div>No record found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Edit Medical Record #{id}
        </h2>

        {message && <p className="mb-4">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white shadow p-6 rounded-xl"
        >
          <div>
            <label>Medical History Notes</label>
            <textarea
              name="medicalHistoryNotes"
              value={record?.medicalHistoryNotes || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Medications</label>
            <textarea
              name="medications"
              value={record?.medications || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Follow-up Required</label>
            <input
              type="text"
              name="followUpRequired"
              value={record?.followUpRequired || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="needTherapy"
              checked={record?.needTherapy || false}
              onChange={handleChange}
            />
            <label>Need Therapy?</label>
          </div>

          {/* ✅ Single-Select Therapy Dropdown */}
          {record?.needTherapy && (
            <div>
              <label className="block font-medium mb-1">Select Therapy</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={record?.requiredTherapy?.[0]?.id || ""}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value, 10);
                  setRecord((prev) => ({
                    ...prev,
                    requiredTherapy: selectedId ? [{ id: selectedId }] : [],
                    needTherapy: !!selectedId,
                  }));
                }}
              >
                <option value="">-- Select Therapy --</option>
                {therapies.map((therapy) => (
                  <option key={therapy.id} value={therapy.id}>
                    {therapy.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label>Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              value={record?.diagnosis || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Prescribed Treatment</label>
            <input
              type="text"
              name="prescribedTreatment"
              value={record?.prescribedTreatment || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Doctor Notes</label>
            <textarea
              name="doctorNotes"
              value={record?.doctorNotes || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={record?.rating || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Status</label>
            <select
              name="status"
              value={record?.status || "PENDING"}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label>No of Days</label>
            <input
              type="number"
              name="noOfDays"
              value={record?.noOfDays || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`mt-4 w-full py-3 rounded-lg font-semibold text-white ${
              saving
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {saving ? "⏳ Saving..." : "💾 Save Record"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalRecordEditPage;