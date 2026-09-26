'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: 'low' | 'medium' | 'high', dueDate: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !dueDate) return;
    onAdd(title.trim(), description.trim(), priority, dueDate);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Plus size={18} className="text-cyan-400" />
          <span className="text-sm">Add new task...</span>
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      priority === p
                        ? p === 'high'
                          ? 'bg-red-500/20 text-red-400 border border-red-400/30'
                          : p === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                          : 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 block mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none focus:border-cyan-400/30 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !dueDate}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                title.trim() && dueDate
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}