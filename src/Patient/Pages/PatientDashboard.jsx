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

const PatientData = {
  fullName: 'PriyaSharma',
  email: 'priya@example.com',
  treatmentPlan: { name: '7‑din ki Shodhan Chikitsa', totalDays: 7, currentDay: 3 },
  todaySession: {
    therapyName: 'Abhyanga (Full Body Massage)',
    time: '10:00 AM',
    therapist: 'Rahul Verma',
    pre_instructions: 'Therapy se 2 ghante pehle kuch na khayein.',
    post_instructions: 'Garam paani se snan karein aur halka bhojan lein.'
  },
  assignment: {
    byDoctor: { name: 'Dr. Meera', time: '09:12 AM' },
    therapistAssigned: { name: 'Rahul Verma', busyLevel: 'Medium' },
    slotStatus: 'Awaiting Slot',
    slot: { date: 'Wed, 03 Sep', time: '10:00 AM', room: 'T2' }
  },
  upcomingSessions: [
    { day: 4, therapyName: 'Shirodhara', status: 'Assigned', eta: 'Pending Slot' },
    { day: 5, therapyName: 'Swedana', status: 'Assigned', eta: 'Pending Slot' },
    { day: 6, therapyName: 'Virechana Prep', status: 'Draft', eta: 'TBD' }
  ],
  lastSessionFeedBackPending: true
};

const containerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};

const itemVariants = { 
  hidden: { y: 18, opacity: 0 }, 
  visible: { y: 0, opacity: 1 } 
};

const PatientDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  // Get user name from localStorage
  const firstName = localStorage.getItem('userFirstName') || '';
  const lastName = localStorage.getItem('userLastName') || '';
  
const createDisplayName = () => {
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
    
    const first = capitalize(firstName);
    const last = capitalize(lastName);
    
    return [first, last].filter(Boolean).join(' ') || 'User';
  };

  const displayName = NormalizeName ? 
    NormalizeName(createDisplayName()) : 
    createDisplayName();

  const initials = displayName
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
            <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between gap-6">
              <h1 className="text-[28px] lg:text-[36px] leading-8 lg:leading-10 font-extrabold tracking-tight font-display text-gray-900">
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
            
            <AajKaNirdesh patientData={PatientData} />
            <ScheduledTherapies patientData={PatientData} />
            
            <div className="grid grid-cols-12 gap-6 mt-6 items-stretch">
              <div className="col-span-12 lg:col-span-6">
                <ProgressSection patientData={PatientData} />
              </div>
              <div className="col-span-12 lg:col-span-6">
                {PatientData.lastSessionFeedBackPending && <FeedBack />}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      
      <SymptomReportModal 
        isOpen={isFormOpen} 
        setIsOpen={setIsFormOpen} 
        patientData={PatientData} 
      />
    </div>
  );
};

export default PatientDashboard;