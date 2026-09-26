'use client';

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ currentDate, onPrev, onNext, onToday }: CalendarHeaderProps) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={onToday}
          className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
        >
          Today
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}