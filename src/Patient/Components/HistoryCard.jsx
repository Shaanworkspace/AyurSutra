import React from 'react';
import { chipClasses } from './Chip';

const fmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const format = (d) => (d ? fmt.format(new Date(d)) : '—'); // safe date display[4]

export default function HistoryCard({ item, onView }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
            {item.therapyName || 'Therapy'}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 truncate">ID: {item.id}</p>
        </div>

        <span
          className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full ${chipClasses[item.status] || chipClasses.Default
            }`}
        >
          {item.status}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:text-sm">
        <div className="min-w-0">
          <p className="text-gray-500">Start</p>
          <p className="font-medium text-gray-900 truncate">{format(item.startDate)}</p>
        </div>
        <div className="min-w-0">
          <p className="text-gray-500">End</p>
          <p className="font-medium text-gray-900 truncate">{format(item.endDate)}</p>
        </div>
        <div className="min-w-0">
          <p className="text-gray-500">Days</p>
          <p className="font-medium text-gray-900">{item.days ?? '—'}</p>
        </div>
        <div className="min-w-0">
          <p className="text-gray-500">Doctor</p>
          <p className="font-medium text-gray-900 truncate">
            {item.doctorName || item.recommendedBy || '—'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <p className="text-[11px] sm:text-xs text-gray-500 truncate">
          Recommended by:{' '}
          <span className="font-medium text-gray-700">
            {item.recommendedBy || item.doctorName || '—'}
          </span>
        </p>
        <button
          onClick={() => onView?.(item)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          View
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 0 1 1-1h9.586l-3.293-3.293a1 1 0 1 1 1.414-1.414l5.001 5.001a1 1 0 0 1 0 1.414l-5.001 5.001a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 0 1-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

