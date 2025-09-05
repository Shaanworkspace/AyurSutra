import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AppointmentCard from './AppointmentCard';
import Chip from './Chip';

const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const ScheduledTherapies = ({ patientData }) => {
  const slotTone =
    patientData.assignment.slotStatus === 'Slot Fixed'
      ? 'green'
      : patientData.assignment.slotStatus === 'Awaiting Slot'
        ? 'amber'
        : patientData.assignment.slotStatus === 'Completed'
          ? 'blue'
          : 'gray';

  return (
    <motion.section variants={itemVariants}>
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Scheduled Therapies</h3>
          <Chip tone={slotTone}>{patientData.assignment.slotStatus}</Chip>
        </div>
        <div className="space-y-3">
          {[patientData.todaySession, ...patientData.upcomingSessions].slice(0, 3).map((session, idx) => (
            <AppointmentCard key={idx} session={session} index={idx} assignment={patientData.assignment} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Link to="/schedule" className="text-emerald-700 font-medium hover:underline">View all in Schedule</Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ScheduledTherapies;