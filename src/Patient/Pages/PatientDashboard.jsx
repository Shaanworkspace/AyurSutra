/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import InlineDropdown from '../Components/InlineDropdown';
import AajKaNirdesh from '../Components/AajKaNirdesh';
import ScheduledTherapies from '../Components/ScheduledTherapies';
import ProgressSection from '../Components/ProgressSection';
import SymptomReportModal from '../Components/SymptomReportModal';
import { NormalizeName } from '../Components/NormalizeName';
import FeedBack from '../Components/FeedBack';
import Header from '../../layout/Header';
import MedicalHistorySection from '../Components/MedicalHistorySection';
import LoadingPage from '@/components/Pages/LoadingPage';
import { getPatientById } from '../../api/patientApi';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const PatientDashboard = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [patientData, setPatientData] = useState(null);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('User');
    const [initials, setInitials] = useState('US');

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                // Grab logged-in user from localStorage
                const storedUser = JSON.parse(localStorage.getItem("userData"));
                if (!storedUser?.id) {
                    console.error("No user found, redirecting to login.");
                    navigate("/login");
                    return;
                }

                const data = await getPatientById(storedUser.id);
                setPatientData(data);

                // Display info
                const fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim();
                const normalizedName = NormalizeName(fullName) || 'User';
                setDisplayName(normalizedName);

                const init = normalizedName
                    .split(' ')
                    .map((n) => n.charAt(0))
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();
                setInitials(init);

            } catch (error) {
                console.error("Failed to fetch patient data:", error);
            }
        };

        fetchPatientData();
    }, [navigate]);

    if (!patientData) {
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
            {/* Fixed Header */}
            <div className="fixed top-0 z-50 w-full">
                <Header />
            </div>

            <div className="flex pt-16">
                <Sidebar displayName={displayName} initials={initials} />

                <main className="flex-1 p-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-[1400px] mx-auto"
                    >
                        {/* Greeting + actions */}
                        <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between gap-6">
                            <h1 className="text-[28px] lg:text-[36px] font-extrabold tracking-tight text-gray-900">
                                Namaste, {displayName}!
                            </h1>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="bg-teal-700 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    Report Symptoms
                                </button>
                                <button
                                    onClick={() => navigate('/choose-doctor')}
                                    className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    Consult Doctor
                                </button>
                                <InlineDropdown />
                            </div>
                        </motion.div>

                        {/* Pass fresh patient data into sections */}
                        <AajKaNirdesh patientData={patientData} />
                        <ScheduledTherapies patientData={patientData} />

                        <div className="grid grid-cols-12 gap-6 mt-6 items-stretch">
                            <div className="col-span-12 lg:col-span-6">
                                <ProgressSection patientData={patientData} />
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                {/* Show feedback component dynamically if needed */}
                                {patientData?.medicalRecords?.length > 0 && <FeedBack />}
                            </div>
                        </div>

                        <div className="mt-6">
                            <MedicalHistorySection patient={patientData} />
                        </div>
                    </motion.div>
                </main>
            </div>

            <SymptomReportModal
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                patientData={patientData}
            />
        </div>
    );
};

export default PatientDashboard;