import React from 'react';
import { chipClasses } from './Chip';

export default function HistoryCard({ item, onView }) {
  return (
    <div
      className="group relative rounded-2xl border border-gray-100 bg-gray-100 shadow-lg 
                 translate-y-[2px] hover:translate-y-0 motion-safe:transition-all motion-safe:duration-200
                 hover:shadow-lg active:scale-[1.05] will-change-transform cursor-pointer"
      onClick={() => onView?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView?.(item);
        }
      }}
    >
      {/* Accent bar with group-hover glow */}
      <div className="opacity-80 group-hover:opacity-100 motion-safe:transition-opacity" />

      <div className="p-4 sm:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 
                      focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-b-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
              {item.therapyName || 'Consultation'}
            </h3>
          </div>
          <span
            className={`flex-shrink-0 text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-medium 
              ${chipClasses[item.status] || chipClasses.Default}`}
          >
            {item.status || "Pending"}
          </span>
        </div>

        {/* Symptoms preview */}
        <div className="mt-4 space-y-3 text-xs sm:text-sm">
          {(item.symptoms || item.notes) && (
            <div className="space-y-1">
              <p className="text-gray-500 text-[11px] sm:text-xs font-medium">Symptoms</p>
              <p className="text-gray-800 line-clamp-2">{item.symptoms || item.notes}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="min-w-0">
              <p className="text-gray-500 text-[11px] sm:text-xs">Doctor</p>
              <p className="font-medium text-gray-900 truncate">{item.doctorName || '—'}</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-[11px] sm:text-xs">Start date</p>
              <p className="font-medium text-gray-900 truncate">{item.startDate ?? '—'}</p>
            </div>
          </div>

          {/* Therapist info */}
          <div className="min-w-0 mt-2">
            <p className="text-gray-500 text-[11px] sm:text-xs">Therapist</p>
            <p className="font-medium text-gray-900 truncate">
              {item.therapistName || "No therapist assigned"}
            </p>
          </div>
        </div>

        {/* CTA row with icon nudge on hover */}
        <div className="mt-5 flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 
                           text-sm font-medium text-white hover:bg-emerald-700 motion-safe:transition-colors">
            View
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 motion-safe:transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 0 1 1-1h9.586l-3.293-3.293a1 1 0 1 1 1.414-1.414l5.001 5.001a1 1 0 0 1 0 1.414l-5.001 5.001a1 1 0 1 1-1.414-1.414L13.586 11H4a1 1 0 0 1-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}