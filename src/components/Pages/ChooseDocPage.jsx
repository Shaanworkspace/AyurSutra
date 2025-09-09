import React, { useState, useEffect } from "react";
import { Stethoscope } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";

export default function ChooseDoctorPage() {
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch("https://ayusutra-backend.onrender.com/api/doctors");
                if (!res.ok) throw new Error("Failed to fetch doctors");
                const data = await res.json();
                setDoctors(data);
            } catch (err) {
                setError("⚠️ " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
            {/* ✅ Header */}
            <Header className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 shadow-md sticky top-0 z-10" />

            {/* ✅ Doctors List */}
            <main className="flex-1 container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-2 text-center">
                    <Stethoscope className="w-8 h-8" /> Choose Your Doctor
                </h2>

                {loading && <p className="text-center text-gray-600">Loading doctors...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div
                            key={doc.id}
                            className={`rounded-2xl border shadow-md p-6 bg-white transition transform hover:scale-105 hover:shadow-lg cursor-pointer ${selectedDoctor?.id === doc.id
                                ? "border-green-600 shadow-green-200"
                                : "border-gray-200"
                                }`}
                            onClick={() => setSelectedDoctor(doc)}
                        >
                            <h3 className="text-xl font-semibold text-green-800">
                                Dr. {doc.firstName} {doc.lastName}
                            </h3>
                            <p className="text-gray-700">{doc.specialization || "Specialization not set"}</p>
                            <p className="text-sm text-gray-500">
                                {doc.hospitalAffiliation || "No hospital affiliation"}
                            </p>
                            <p className="text-sm">Qualification: {doc.qualification || "N/A"}</p>
                            <p className="font-semibold text-green-700 mt-2">Email: {doc.email}</p>
                            <p className="text-sm text-gray-600">Phone: {doc.phoneNumber}</p>

                            <button
                                onClick={() => {
                                    navigate(`/doctor-appointment?doctorId=${doc.id}`);
                                }}
                                className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                            >
                                Select Doctor
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* ✅ Footer */}
            <Footer className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 mt-10" />
        </div>
    );
}