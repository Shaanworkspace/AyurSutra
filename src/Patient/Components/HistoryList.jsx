import React from 'react';
import HistoryCard from './HistoryCard';

export default function HistoryList({ items, onView }) {
  if (!items?.length) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-gray-300 bg-white py-10 sm:py-14 px-4">
        <div className="text-center max-w-md">
          <p className="text-base sm:text-lg font-semibold text-gray-800">No history yet</p>
          <p className="mt-1 text-sm text-gray-500">Completed or scheduled therapies will appear here once available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {items.map((item) => (
        <HistoryCard key={item.id} item={item} onView={onView} />
      ))}
    </div>
  );
}

