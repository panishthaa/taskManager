import { Task, TaskStatus } from '../../../../src/app/lib/types';
import TaskCard from './TaskCard';
import { PlusIcon } from '@heroicons/react/24/outline';

interface StatusColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function StatusColumn({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: StatusColumnProps) {
  const statusColors = {
    todo: 'border-blue-500',
    'in-progress': 'border-yellow-500',
    done: 'border-green-500',
  };

  return (
    <div className="flex-1 min-w-64">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-primary">{title}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => onAddTask(status)}
          className="w-full flex items-center justify-center p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          <span>Add Task</span>
        </button>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
