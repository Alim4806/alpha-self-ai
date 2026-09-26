'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { CheckSquare } from 'lucide-react';

// Dummy initial tasks
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the Q3 project proposal for client review',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-07-28',
    createdAt: '2026-07-25',
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests from the team and provide feedback',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-07-26',
    createdAt: '2026-07-24',
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update the API documentation with new endpoints',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-07-30',
    createdAt: '2026-07-23',
  },
  {
    id: '4',
    title: 'Deploy to production',
    description: 'Deploy the latest version to the production environment',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-07-22',
    createdAt: '2026-07-20',
  },
  {
    id: '5',
    title: 'Fix login bug',
    description: 'Investigate and fix the authentication flow issue',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-07-27',
    createdAt: '2026-07-25',
  },
];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  // Add a new task
  const addTask = (title: string, description: string, priority: Task['priority'], dueDate: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'pending',
      priority,
      dueDate,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle task status (pending -> in-progress -> completed)
  const toggleStatus = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const statusMap = {
          'pending': 'in-progress' as const,
          'in-progress': 'completed' as const,
          'completed': 'pending' as const,
        };
        return { ...task, status: statusMap[task.status] };
      }
      return task;
    }));
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  // Count tasks by status
  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Task Manager
          </h1>
          <p className="text-sm text-gray-400">
            Organize, track, and complete your daily tasks
          </p>
        </div>

        {/* Add Task Form */}
        <TaskForm onAdd={addTask} />

        {/* Stats & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  filter === status
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                    : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1 text-[10px] text-gray-500">
                  ({counts[status]})
                </span>
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} shown
          </span>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleStatus}
          onDelete={deleteTask}
        />

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Tasks are stored locally
          </p>
        </div>
      </div>
    </AppLayout>
  );
}