import Link from 'next/link';
import { Board } from '../../lib/types';

interface BoardCardProps {
  board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/board/${board.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-40 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow duration-200">
        <h2 className="text-lg font-semibold text-white line-clamp-2">
          {board.title}
        </h2>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{board.taskIds?.length || 0} tasks</span>
          <span className="text-xs">
            {new Date(board.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
