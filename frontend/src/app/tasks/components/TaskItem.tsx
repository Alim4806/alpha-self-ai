import { Task } from '../page';
import { CheckCircle, Circle, Clock, Check, Trash2, Calendar } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-white/10 border-white/10';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return <Circle size={16} className="text-gray-400 flex-shrink-0" />;
      case 'in-progress': return <Clock size={16} className="text-yellow-400 flex-shrink-0" />;
      case 'completed': return <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />;
      default: return <Circle size={16} className="text-gray-400" />;
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return '';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div
      className={`group p-4 rounded-xl border transition-all duration-200 ${
        task.status === 'completed'
          ? 'border-green-500/20 bg-green-500/5'
          : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Status Toggle Button */}
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform"
          aria-label={`Mark as ${task.status === 'completed' ? 'pending' : 'next status'}`}
        >
          {getStatusIcon(task.status)}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-sm font-medium ${
                task.status === 'completed'
                  ? 'text-gray-500 line-through'
                  : 'text-white'
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border ${
                task.status === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : task.status === 'in-progress'
                  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
              }`}
            >
              {getStatusLabel(task.status)}
            </span>
            {isOverdue && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Overdue
              </span>
            )}
          </div>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.status === 'completed'
                  ? 'text-gray-500'
                  : 'text-gray-300'
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}