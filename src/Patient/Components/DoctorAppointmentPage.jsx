/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Stethoscope, UserCircle2 } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

export default function DoctorAppointmentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const doctorId = searchParams.get("doctorId");

    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);
    const [form, setForm] = useState({
        symptoms: "",
        diagnosis: "",
        prescribedTreatment: "",
        notes: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // ─── Load doctor + patient ──────────────────────────────
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch(
                    `https://ayusutra-backend.onrender.com/api/doctors/${doctorId}`
                );
                if (!res.ok) throw new Error("Failed to fetch doctor");
                setDoctor(await res.json());
            } catch (err) {
                setMessage("⚠️ " + err.message);
            } finally {
                setLoading(false);
            }
        };

        const stored = JSON.parse(localStorage.getItem("userData"));
        if (!stored) {
            navigate("/login");
            return;
        }
        setPatient(stored);

        fetchDoctor();
    }, [doctorId, navigate]);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // ─── Submit form to backend ─────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setSubmitting(true);

        if (!doctor?.id || !patient?.id) {
            setMessage("❌ Doctor ID or Patient ID is missing.");
            setSubmitting(false);
            return;
        }

        try {
            const payload = {
                symptoms: form.symptoms,
                diagnosis: form.diagnosis,
                prescribedTreatment: form.prescribedTreatment,
                notes: form.notes,
                doctor: { id: doctor.id },
            };

            const res = await fetch(
                `https://ayusutra-backend.onrender.com/api/patients/doctor-visit/${patient.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) throw new Error(await res.text());

            setSuccess(true);
            setMessage("Yup!  Appointment booked successfully!");
            setForm({ symptoms: "", diagnosis: "", prescribedTreatment: "", notes: "" });

            // Redirect to payment page after successful appointment
            setTimeout(() => {
                navigate(`/payment?doctorId=${doctor?.id}&patientId=${patient?.id}`);
            }, 1500);
        } catch (err) {
            setMessage("❌ " + err.message);
            setSuccess(false);
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Loading screen while fetching ──────────────────────
    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading appointment form...
            </div>
        );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl mx-auto bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-green-100 p-8"
                >
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-green-700 mb-8 text-center flex items-center justify-center gap-3">
                        <Stethoscope className="w-8 h-8 text-emerald-600" />
                        Book Appointment
                    </h2>

                    {/* Feedback message */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`mb-6 flex items-center justify-center gap-2 py-3 px-4 rounded-lg shadow ${success
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-red-100 text-red-700 border border-red-300"
                                    }`}
                            >
                                {success ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5" />
                                )}
                                <span>{message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Patient Info */}
                        <section className="bg-slate-50 border rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                <UserCircle2 className="w-5 h-5 text-green-700" /> Patient Details
                            </h3>
                            <p>
                                <strong>Name:</strong> {patient?.firstName} {patient?.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong> {patient?.email}
                            </p>
                        </section>

                        {/* Doctor Info */}
                        <section className="bg-slate-50 border rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                <Stethoscope className="w-5 h-5 text-green-700" /> Doctor Details
                            </h3>
                            <p>
                                <strong>Name:</strong> Dr. {doctor?.firstName} {doctor?.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong> {doctor?.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {doctor?.phoneNumber}
                            </p>
                            <p>
                                <strong>Specialization:</strong> {doctor?.specialization || "Ayurveda"}
                            </p>
                        </section>

                        {/* Appointment Form */}
                        <section>
                            <label className="block text-gray-700 font-medium mb-1">
                                Symptoms <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="symptoms"
                                value={form.symptoms}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                rows={3}
                                required
                            />
                        </section>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Diagnosis</label>
                                <input
                                    type="text"
                                    name="diagnosis"
                                    value={form.diagnosis}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Prescribed Treatment
                                </label>
                                <input
                                    type="text"
                                    name="prescribedTreatment"
                                    value={form.prescribedTreatment}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <section>
                            <label className="block text-gray-700 font-medium mb-1">Notes</label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                rows={2}
                            />
                        </section>
                        {/* Payment Button (only visible on success) */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="mt-6 text-center"
                            >
                                <button
                                    onClick={() => navigate(`/payment?doctorId=${doctor?.id}&patientId=${patient?.id}`)}
                                    className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg transition"
                                >
                                    💳 Proceed to Payment
                                </button>
                            </motion.div>
                        )}
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all ${submitting
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
                                }`}
                        >
                            {submitting ? "⏳ Booking..." : "Confirm Appointment"}
                        </button>
                    </form>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}