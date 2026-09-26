'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import DayView from './components/DayView';
import EventForm from './components/EventForm';
import { Calendar } from 'lucide-react';

// Dummy events data
const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    date: '2026-07-25',
    title: 'Team Meeting',
    time: '10:00',
    description: 'Weekly sync with the team',
  },
  {
    id: '2',
    date: '2026-07-26',
    title: 'Doctor Appointment',
    time: '14:30',
    description: 'Annual checkup',
  },
  {
    id: '3',
    date: '2026-07-28',
    title: 'Project Deadline',
    time: '17:00',
    description: 'Submit final deliverables',
  },
  {
    id: '4',
    date: '2026-07-30',
    title: 'Lunch with Client',
    time: '12:00',
    description: 'Discuss new contract',
  },
  {
    id: '5',
    date: '2026-08-01',
    title: 'Board Meeting',
    time: '09:00',
    description: 'Quarterly review',
  },
];

export type Event = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time: string;
  description: string;
};

export default function PlannerPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  // Select a day
  const selectDay = (date: string) => {
    setSelectedDate(date);
    setShowEventForm(false);
    setEditingEvent(null);
  };

  // Add/Update event
  const saveEvent = (title: string, time: string, description: string) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map((e) =>
        e.id === editingEvent.id
          ? { ...e, title, time, description }
          : e
      ));
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent: Event = {
        id: Date.now().toString(),
        date: selectedDate,
        title,
        time,
        description,
      };
      setEvents([...events, newEvent]);
    }
    setShowEventForm(false);
  };

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    if (editingEvent?.id === id) setEditingEvent(null);
  };

  // Get events for selected day
  const eventsForSelectedDay = events.filter((e) => e.date === selectedDate);

  // Check if a day has events
  const hasEvents = (date: string) => {
    return events.some((e) => e.date === date);
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Planner
          </h1>
          <p className="text-sm text-gray-400">
            Manage your schedule and events
          </p>
        </div>

        {/* Main Content: Calendar + Day View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Calendar */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
              <CalendarHeader
                currentDate={currentDate}
                onPrev={goToPreviousMonth}
                onNext={goToNextMonth}
                onToday={goToToday}
              />
              <CalendarGrid
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelectDate={selectDay}
                hasEvents={hasEvents}
              />
            </div>
          </div>

          {/* Right: Day View */}
          <div className="lg:col-span-1">
            <DayView
              date={selectedDate}
              events={eventsForSelectedDay}
              onAddEvent={() => {
                setEditingEvent(null);
                setShowEventForm(true);
              }}
              onEditEvent={(event) => {
                setEditingEvent(event);
                setShowEventForm(true);
              }}
              onDeleteEvent={deleteEvent}
            />
          </div>
        </div>

        {/* Event Form Modal */}
        {showEventForm && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowEventForm(false);
              setEditingEvent(null);
            }}
          >
            <div
              className="w-full max-w-md rounded-xl border border-white/10 bg-[#0a0f1e] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <EventForm
                initialEvent={editingEvent || undefined}
                onSave={saveEvent}
                onCancel={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Events are stored locally
          </p>
        </div>
      </div>
    </AppLayout>
  );
}