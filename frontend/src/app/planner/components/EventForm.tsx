'use client';

import { useState, useEffect } from 'react';
import { Event } from '../page';
import { X } from 'lucide-react';

interface EventFormProps {
  initialEvent?: Event;
  onSave: (title: string, time: string, description: string) => void;
  onCancel: () => void;
}

export default function EventForm({ initialEvent, onSave, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [time, setTime] = useState(initialEvent?.time || '12:00');
  const [description, setDescription] = useState(initialEvent?.description || '');

  const handleSubmit = () => {
    if (!title.trim() || !time) return;
    onSave(title.trim(), time, description.trim());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {initialEvent ? 'Edit Event' : 'New Event'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/30 transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-2 justify-end pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !time}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              title.trim() && time
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            {initialEvent ? 'Update' : 'Add'} Event
          </button>
        </div>
      </div>
    </div>
  );
}