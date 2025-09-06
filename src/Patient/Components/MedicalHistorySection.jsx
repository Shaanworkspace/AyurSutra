import React from 'react';
import HistoryList from './HistoryList';
import HistoryDetailModal from './HistoryDetailModal';

const fallback = [
  {
    id: 'APPT-1007',
    therapyName: 'Shodhan Chikitsa',
    startDate: '2025-08-22',
    endDate: '2025-08-28',
    days: 7,
    status: 'Completed',
    doctorName: 'Dr. Meera',
    therapistName: 'Rahul Verma',
    recommendedBy: 'Dr. Meera',
    location: 'Room T2',
    notes: 'Patient responded well; advised light diet and hydration.'
  },
  {
    id: 'APPT-1008',
    therapyName: 'Abhyanga',
    startDate: '2025-09-01',
    endDate: '2025-09-03',
    days: 3,
    status: 'Pending',
    doctorName: 'Dr. Amit',
    therapistName: 'Sneha',
    recommendedBy: 'Dr. Amit',
    location: 'Room T1',
    notes: 'Awaiting lab results before final session.'
  },
  {
    id: 'APPT-1009',
    therapyName: 'Shirodhara',
    startDate: '2025-07-10',
    endDate: '2025-07-12',
    days: 3,
    status: 'Cancelled',
    doctorName: 'Dr. Kiran',
    therapistName: 'Mahesh',
    recommendedBy: 'Dr. Kiran',
    location: 'Room T3',
    notes: 'Cancelled due to patient travel.'
  }
];

export default function MedicalHistorySection({ items }) {
  const data = Array.isArray(items) && items.length ? items : fallback; // safe default
  const [selected, setSelected] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  // Optional client filter by status
  const [statusFilter, setStatusFilter] = React.useState('All'); // All | Completed | Pending | Cancelled
  const filtered = data.filter(d => (statusFilter === 'All' ? true : d.status === statusFilter)); // simple filter

  return (
    <section className="mt-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Therapy History</h2>
            <p className="text-sm text-gray-600">Past therapies, durations, doctors, and statuses</p>
          </div>
          {/* Simple status filter */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Completed', 'Pending', 'Cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm border ${statusFilter === s ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-300 text-gray-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <HistoryList
          items={filtered}
          onView={(item) => { setSelected(item); setOpen(true); }}
        />

        {/* Detail modal */}
        <HistoryDetailModal
          open={open}
          onClose={() => { setOpen(false); setSelected(null); }}
          item={selected}
        />
      </div>
    </section>
  );
}

