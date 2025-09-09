/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stethoscope,
  ClipboardList,
  NotebookText,
  HeartPulse,
  User,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Star,
  Clock,
} from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { LoadingPage } from "@/components/Pages/LoadingPage";

const PatientRecordDetailPage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [therapistSlots, setTherapistSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch medical record
        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/medical-records/${id}`
        );
        if (!res.ok) throw new Error(await res.text());
        const rec = await res.json();
        setRecord(rec);

        // Fetch therapists list
        const res2 = await fetch(
          `https://ayusutra-backend.onrender.com/api/therapists`
        );
        if (!res2.ok) throw new Error(await res2.text());
        const th = await res2.json();
        setTherapists(th);

        // If record already has therapist, preload their slots
        if (rec.therapist) {
          await fetchTherapistSlots(rec.therapist.id);
        }
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Failed to fetch record ❌" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchTherapistSlots = async (therapistId) => {
    try {
      const res = await fetch(
        `https://ayusutra-backend.onrender.com/api/therapists/${therapistId}`
      );
      if (!res.ok) throw new Error(await res.text());
      const therapistData = await res.json();
      setTherapistSlots(therapistData.scheduleSlots || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTherapistSelect = (e) => {
    const tId = parseInt(e.target.value, 10);
    const th = therapists.find((t) => t.id === tId);
    setSelectedTherapist(th || null);
  };

  const handleAssignTherapist = async () => {
    if (!selectedTherapist) {
      setMessage({
        type: "error",
        text: "⚠️ Please select a therapist first!",
      });
      return;
    }
    try {
      setSaving(true);
      setMessage(null);
      const res = await fetch(
        `https://ayusutra-backend.onrender.com/api/medical-records/${record.id}/assign-therapist/${selectedTherapist.id}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setRecord(updated);
      setMessage({
        type: "success",
        text: "✅ Therapist assigned successfully!",
      });

      // fetch slots for this therapist
      await fetchTherapistSlots(selectedTherapist.id);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Failed to assign therapist" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Booking a slot
  const handleBookSlot = async (slot) => {
    if (!record?.patient?.id || !record?.therapist?.id) {
      alert("❌ Patient ID or therapist not available");
      return;
    }
    try {
      setBooking(true);
      const res = await fetch(
        `https://ayusutra-backend.onrender.com/api/therapists/${record.therapist.id}/book-slot/${slot.id}?patientId=${record.patient.id}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error(await res.text());
      const updatedSlot = await res.json();

      // re-fetch slots
      await fetchTherapistSlots(record.therapist.id);

      setMessage({
        type: "success",
        text: `✅ Successfully booked ${slot.startTime} - ${slot.endTime} on ${slot.date}`,
      });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "❌ Failed to book slot" });
    } finally {
      setBooking(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="p-6">
        <LoadingPage />
      </div>
    );
  if (!record)
    return (
      <div className="p-6 text-red-500 font-semibold">❌ Record not found</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-700 text-center">
          Medical Record #{record.id}
        </h1>

        {/* Feedback message */}
        {message && (
          <div
            className={`px-4 py-2 rounded-lg text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Patient & Doctor Info ... (unchanged) */}

        {/* Therapist Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border space-y-4">
          <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" /> Therapist Info
          </h2>
          {record.therapist ? (
            <>
              <p>
                <strong>Name:</strong> {record.therapist.firstName}{" "}
                {record.therapist.lastName}
              </p>
              <p>
                <Mail className="w-4 h-4 text-gray-500" />{" "}
                {record.therapist.email}
              </p>
              <p>
                <Phone className="w-4 h-4 text-gray-500" />{" "}
                {record.therapist.phoneNumber}
              </p>
            </>
          ) : (
            <p>No therapist assigned yet</p>
          )}

          {/* Select & Assign */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Assign Therapist:
            </label>
            <select
              onChange={handleTherapistSelect}
              defaultValue=""
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="" disabled>
                -- Select Therapist --
              </option>
              {therapists.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.firstName} {t.lastName} — {t.expertise}
                </option>
              ))}
            </select>

            <div className="mt-3">
              <button
                disabled={saving}
                onClick={handleAssignTherapist}
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
              >
                {saving ? "⏳ Assigning..." : "Assign Therapist"}
              </button>
            </div>
          </div>
        </div>

        {/* Available Slots from assigned therapist */}
        {record.therapist && (
          <div className="bg-white rounded-xl shadow-lg p-6 border space-y-4">
            <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-600" /> Available Slots
            </h2>
            {therapistSlots?.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {therapistSlots
                  .filter((s) => s.status === "AVAILABLE")
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 border rounded-lg hover:shadow cursor-pointer"
                    >
                      <p className="font-semibold">
                        {slot.date} ({slot.startTime} - {slot.endTime})
                      </p>
                      <button
                        disabled={booking}
                        onClick={() => handleBookSlot(slot)}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        {booking ? "Booking..." : "Book"}
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <p>No available slots</p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PatientRecordDetailPage;