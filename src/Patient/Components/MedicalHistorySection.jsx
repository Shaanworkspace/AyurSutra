import React from 'react';
import HistoryList from './HistoryList';
import HistoryDetailModal from './HistoryDetailModal';
import { toHistoryItems } from '../utils/historyMapper';

export default function MedicalHistorySection({ patient }) {
  const source = patient;
  const items = React.useMemo(() => toHistoryItems(source), [source]);

  const [selected, setSelected] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('All');

  const filtered = items.filter((d) => (statusFilter === 'All' ? true : d.status === statusFilter));

  return (
    <section className="mt-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Therapy History</h2>

          </div>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Completed', 'Pending', 'Cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  statusFilter === s
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white border-gray-300 text-gray-700'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <HistoryList
          items={filtered}
          onView={(item) => {
            setSelected(item);
            setOpen(true);
          }}
        />

        {/* Detail modal */}
        <HistoryDetailModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelected(null);
          }}
          item={selected}
        />
      </div>
    </section>
  );
}