import { Event } from '../page';
import { Calendar, Plus, Clock, Edit2, Trash2 } from 'lucide-react';

interface DayViewProps {
  date: string;
  events: Event[];
  onAddEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

export default function DayView({ date, events, onAddEvent, onEditEvent, onDeleteEvent }: DayViewProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white">
          {formatDate(date)}
        </h3>
        <button
          onClick={onAddEvent}
          className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          aria-label="Add event"
        >
          <Plus size={16} />
        </button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <Calendar size={32} className="text-gray-600 mb-2" />
          <p className="text-sm text-gray-400">No events for this day</p>
          <button
            onClick={onAddEvent}
            className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Add your first event
          </button>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {events.map((event) => (
            <div
              key={event.id}
              className="group p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {event.time}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-1 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                    aria-label="Edit event"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Delete event"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}