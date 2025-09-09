/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import PatientListPanel from "../Components/PatientListPanel";
import { LoadingPage } from "@/components/Pages/LoadingPage";

const DoctorDashboardPage = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const storedId = localStorage.getItem("userId");
                const storedType = localStorage.getItem("userType");

                if (!storedId || storedType !== "doctor") {
                    navigate("/login");
                    return;
                }

                const res = await fetch(
                    `https://ayusutra-backend.onrender.com/api/doctors/${storedId}`
                );
                if (!res.ok) throw new Error("Network error");

                const data = await res.json();
                setDoctorData(data);

                if (data.medicalRecords.length > 0) {
                    setSelectedPatientId(data.medicalRecords[0].patientId);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [navigate]);

    const patients = useMemo(() => {
        if (!doctorData?.medicalRecords) return [];
        const map = new Map();
        for (const record of doctorData.medicalRecords) {
            if (!map.has(record.patientId)) {
                map.set(record.patientId, { id: record.patientId, name: record.patientName });
            }
        }
        return Array.from(map.values());
    }, [doctorData]);

    const selectedPatientRecords = useMemo(
        () =>
            doctorData?.medicalRecords.filter(
                (r) => r.patientId === selectedPatientId
            ) || [],
        [doctorData, selectedPatientId]
    );

    if (loading) return <LoadingPage />;
    if (!doctorData) return <p className="text-red-500">❌ Failed to load doctor data.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
            <div className="fixed inset-x-0 top-0 z-40">
                <Header />
            </div>

            <div className="flex pt-16">
                <Sidebar doctor={doctorData} />

                <PatientListPanel
                    patients={patients}
                    selectedPatientId={selectedPatientId}
                    onSelectPatient={setSelectedPatientId}
                />

                <main className="flex-1 p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <DashboardHeader
                            doctorName={doctorData.firstName}
                            records={doctorData.medicalRecords}
                        />

                        {selectedPatientId ? (
                            <div className="mt-6 bg-white shadow p-6 rounded-xl">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    Patient Dashboard:{" "}
                                    {patients.find((p) => p.id === selectedPatientId)?.name}
                                </h2>
                                {selectedPatientRecords.map((rec) => (
                                    <div key={rec.id} className="border-b py-3 last:border-b-0">
                                        <p className="text-gray-800">
                                            <strong>Symptoms:</strong> {rec.symptoms}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Status: {rec.status || "Open"} · Created:{" "}
                                            {rec.createdDate || "N/A"}
                                        </p>
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                onClick={() => navigate(`/medical-records/${rec.id}`)}
                                                className="px-3 py-1 text-sm bg-green-600 text-white 
             rounded-md hover:bg-green-700 transition-colors"
                                            >
                                                📋 View Record
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-8">Select a patient to view details</p>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboardPage;