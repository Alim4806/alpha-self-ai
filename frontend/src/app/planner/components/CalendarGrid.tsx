'use client';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  hasEvents: (date: string) => boolean;
}

export default function CalendarGrid({ currentDate, selectedDate, onSelectDate, hasEvents }: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build grid: 6 rows x 7 columns
  const totalCells = 42;
  const cells = [];

  // Previous month days
  const prevMonthStart = daysInPrevMonth - firstDay + 1;
  for (let i = prevMonthStart; i <= daysInPrevMonth; i++) {
    const date = new Date(year, month - 1, i);
    const dateStr = date.toISOString().split('T')[0];
    cells.push({
      date: dateStr,
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateStr = date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    cells.push({
      date: dateStr,
      day: i,
      isCurrentMonth: true,
      isToday: dateStr === today,
    });
  }

  // Next month days
  const remaining = totalCells - cells.length;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    const dateStr = date.toISOString().split('T')[0];
    cells.push({
      date: dateStr,
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell) => {
          const isSelected = cell.date === selectedDate;
          const hasEvent = hasEvents(cell.date);

          return (
            <button
              key={cell.date}
              onClick={() => onSelectDate(cell.date)}
              className={`
                relative aspect-square rounded-lg text-sm font-medium transition-all duration-200
                ${cell.isCurrentMonth ? 'text-white' : 'text-gray-600'}
                ${isSelected ? 'bg-cyan-500/30 border border-cyan-400/50 shadow-lg shadow-cyan-500/20' : ''}
                ${cell.isToday && !isSelected ? 'border border-cyan-500/30 bg-cyan-500/10' : ''}
                ${!isSelected && cell.isCurrentMonth ? 'hover:bg-white/10' : ''}
                flex items-center justify-center
              `}
            >
              {cell.day}
              {hasEvent && (
                <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-cyan-500/60'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}