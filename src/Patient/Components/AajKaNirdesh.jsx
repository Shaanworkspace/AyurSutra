/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock, UserCheck, Users } from 'lucide-react';
import Chip from './Chip';

const itemVariants = { 
  hidden: { y: 18, opacity: 0 }, 
  visible: { y: 0, opacity: 1 } 
};

const AajKaNirdesh = ({ patientData }) => {
  // Always run hooks
  const slotTone = useMemo(() => {
    const status = patientData?.assignment?.slotStatus;
    switch (status) {
      case 'Slot Fixed':
        return 'green';
      case 'Awaiting Slot':
        return 'amber';
      case 'Completed':
        return 'blue';
      default:
        return 'gray';
    }
  }, [patientData?.assignment?.slotStatus]);

  if (!patientData) return null;

  const { treatmentPlan, todaySession, assignment } = patientData;
  const isEvening = new Date().getHours() >= 18;

  return (
    <motion.div 
      variants={itemVariants} 
      className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-8 rounded-2xl shadow-lg mb-8 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative">
        <div>
          <h2 className="text-2xl font-bold">Aaj ka Nirdesh</h2>
          {treatmentPlan?.currentDay && treatmentPlan?.totalDays && (
            <p className="text-sm text-green-100">
              Day {treatmentPlan.currentDay} of {treatmentPlan.totalDays}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-green-100 bg-green-900/40 px-3 py-1 rounded-full text-sm">
          {isEvening ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6 relative">
        {/* Today's Session */}
        <div className="bg-white/15 p-6 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-white text-green-600 rounded-xl grid place-items-center mr-4 shadow-md">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {todaySession?.therapyName || "No Session Today"}
              </h3>
              {todaySession?.time && (
                <p className="text-green-100 text-sm">
                  {todaySession.time} · Therapist: {todaySession?.therapist || "TBA"}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 text-sm leading-relaxed">
            <p className="text-green-50">
              <span className="font-semibold text-white">Pre:</span>{" "}
              {todaySession?.pre_instructions || "Drink water"}
            </p>
            <p className="text-green-50">
              <span className="font-semibold text-white">Post:</span>{" "}
              {todaySession?.post_instructions || "DO yoga"}
            </p>
          </div>
        </div>

        {/* Flow Status */}
        <div className="bg-white/15 p-6 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
          <h4 className="font-semibold mb-4 text-lg">Flow Status</h4>
          <div className="flex flex-wrap gap-3 text-sm">
            {assignment?.byDoctor?.name && (
              <Chip tone="green" icon={<UserCheck className="w-4 h-4" />}>
                Assigned by {assignment.byDoctor.name}
              </Chip>
            )}
            {assignment?.therapistAssigned?.name && (
              <Chip tone="blue" icon={<Users className="w-4 h-4" />}>
                Therapist: {assignment.therapistAssigned.name}
              </Chip>
            )}
            {assignment?.slotStatus ? (
              <Chip tone={slotTone}>{assignment.slotStatus}</Chip>
            ) : (
              <Chip tone="gray">Status Pending</Chip>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AajKaNirdesh;