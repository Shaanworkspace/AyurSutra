import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Chip from './Chip';

const AppointmentCard = ({ session, index, assignment }) => {
  const isToday = index === 0;
  const title = session.therapyName;
  const meta = isToday ? `${session.time} - Therapist ${session.therapist}` : `Day ${session.day} - ${session.eta}`;
  const right = isToday ? assignment.slotStatus : session.status;
  const tone = right === 'Slot Fixed' ? 'green' : right === 'Assigned' ? 'blue' : right?.includes('Pending') ? 'amber' : 'gray';

  return (
    <motion.div whileHover={{ y: -2 }} className="p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-all border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center font-bold">{index + 1}</div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{meta}</p>
        </div>
        <div className="flex items-center gap-2">
          <Chip tone={tone}>{right}</Chip>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;