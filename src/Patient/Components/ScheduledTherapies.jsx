/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';
import Chip from './Chip';

const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const ScheduledTherapies = ({ patientData }) => {
  // Safely read slot status
  const slotStatus = patientData?.assignment?.slotStatus || "No Status";
  const slotTone =
    slotStatus === 'Slot Fixed'
      ? 'green'
      : slotStatus === 'Awaiting Slot'
        ? 'amber'
        : slotStatus === 'Completed'
          ? 'blue'
          : 'gray';

  // Merge today's session + upcoming into one array safely
  const sessions = [
    ...(patientData?.todaySession ? [patientData.todaySession] : []),
    ...(patientData?.upcomingSessions || []),
  ];

  return (
    <motion.section variants={itemVariants}>
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Scheduled Therapies</h3>
          <Chip tone={slotTone}>{slotStatus}</Chip>
        </div>

        {/* If no sessions, fallback */}
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No therapies scheduled yet.</p>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 3).map((session, idx) => (
              <AppointmentCard
                key={idx}
                session={session}
                index={idx}
                assignment={patientData?.assignment || {}}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-end">
          <Link
            to="/schedule"
            className="text-emerald-700 font-medium hover:underline"
          >
            View all in Schedule
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ScheduledTherapies;