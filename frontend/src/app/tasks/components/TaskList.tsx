import { Task } from '../page';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-white font-medium">No tasks here</h3>
        <p className="text-gray-500 text-sm mt-1">
          Add a new task to get started
        </p>
      </div>
    );
  }

  // Sort tasks: pending > in-progress > completed
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { pending: 0, 'in-progress': 1, completed: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="space-y-2">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}