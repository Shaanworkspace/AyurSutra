import React from 'react';
import { motion } from 'framer-motion';
import Donut from './Donut';

const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const ProgressSection = ({ patientData }) => {
  const overall = Math.round((patientData.treatmentPlan.currentDay / patientData.treatmentPlan.totalDays) * 100);
  const colorForPctBand = (p) => (p <= 33 ? '#ef4444' : p <= 66 ? '#f59e0b' : '#059669');
  const band = (p) => (p <= 33 ? 0 : p <= 66 ? 1 : 2);
  const huePrep = ['#ef4444', '#ec4899', '#a21caf'];
  const hueTherapy = ['#f59e0b', '#ea580c', '#eab308'];
  const hueRecovery = ['#14b8a6', '#059669', '#22c55e'];
  const colorFor = (label, val) => {
    const i = band(val);
    if (label === 'Prep') return huePrep[i];
    if (label === 'Therapy') return hueTherapy[i];
    return hueRecovery[i];
  };

  const segments = React.useMemo(() => {
    const arr = [
      { label: 'Prep', value: Math.min(20, overall) },
      { label: 'Therapy', value: Math.max(0, Math.min(60, overall - 20)) },
      { label: 'Recovery', value: Math.max(0, overall - 80) }
    ];
    return arr.map(s => ({ ...s, color: colorFor(s.label, s.value) }));
  }, [overall]);

  return (
    <motion.section variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Chikitsa Pragati</h3>
      <p className="text-gray-600 mb-4">{patientData.treatmentPlan.name}</p>
      <div className="flex-1 grid gap-4 items-center grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-center">
          <Donut segments={segments} size={170} stroke={22} centerColor={colorForPctBand(overall)} />
        </div>
        <div className="space-y-3">
          {segments.map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
                <span className="text-sm text-gray-700">{s.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{s.value}%</span>
            </div>
          ))}
          <div className="!mt-4 grid grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-50 text-emerald-700 rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{patientData.treatmentPlan.currentDay}</div>
              <div>Completed</div>
            </div>
            <div className="bg-teal-50 text-teal-700 rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{patientData.treatmentPlan.totalDays - patientData.treatmentPlan.currentDay}</div>
              <div>Remaining</div>
            </div>
            <div className="bg-green-50 text-green-700 rounded-lg p-3 text-center">
              <div className="font-bold text-lg">{overall}%</div>
              <div>Overall</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProgressSection;