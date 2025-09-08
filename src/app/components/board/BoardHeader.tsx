import { Board } from '../../../../src/app/lib/types';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ThemeToggle';

interface BoardHeaderProps {
  board: Board;
  onAddTask: () => void;
}

export default function BoardHeader({ board, onAddTask }: BoardHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {board.title}
          </h1>
          {board.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {board.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={onAddTask}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>
    </div>
  );
}
