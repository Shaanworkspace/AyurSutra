import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock } from 'lucide-react';
import Chip from './Chip';

const itemVariants = { 
  hidden: { y: 18, opacity: 0 }, 
  visible: { y: 0, opacity: 1 } 
};

const AajKaNirdesh = ({ patientData }) => {
  if (!patientData) {
    return null;
  }

  const isEvening = new Date().getHours() >= 18;
  const slotTone = React.useMemo(() => {
    switch (patientData.assignment.slotStatus) {
      case 'Slot Fixed':
        return 'green';
      case 'Awaiting Slot':
        return 'amber';
      case 'Completed':
        return 'blue';
      default:
        return 'gray';
    }
  }, [patientData.assignment.slotStatus]);

  return (
    <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">Aaj ka Nirdesh</h2>
          <p className="text-green-100">Day {patientData.treatmentPlan.currentDay} of {patientData.treatmentPlan.totalDays}</p>
        </div>
        <div className="flex items-center gap-2 text-green-100 bg-green-900/30 px-3 py-1 rounded-full text-sm">
          {isEvening ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long' })}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-white text-green-600 rounded-lg grid place-items-center mr-4">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{patientData.todaySession.therapyName}</h3>
              <p className="text-green-100">{patientData.todaySession.time} - Therapist: {patientData.todaySession.therapist}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-green-50"><span className="font-semibold text-white">Pre:</span> {patientData.todaySession.pre_instructions}</p>
            <p className="text-green-50"><span className="font-semibold text-white">Post:</span> {patientData.todaySession.post_instructions}</p>
          </div>
        </div>
        <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
          <h4 className="font-semibold mb-4">Flow Status</h4>
          <div className="flex flex-wrap gap-3">
            <Chip tone="green"><span className="inline-block w-4 h-4 mr-1">✔</span>Assigned by {patientData.assignment.byDoctor.name}</Chip>
            <Chip tone="blue">Therapist: {patientData.assignment.therapistAssigned.name}</Chip>
            <Chip tone={slotTone}>{patientData.assignment.slotStatus}</Chip>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AajKaNirdesh;