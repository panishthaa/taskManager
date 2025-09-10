'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useBoards } from './hooks/useBoards';
import BoardCard from './components/boards/BoardCard';
import CreateBoardModal from './components/boards/CreateBoardModal';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const { boards, addBoard } = useBoards();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateBoard = (title: string, description?: string) => {
    addBoard({ title, description });
    setIsCreateModalOpen(false);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Your Boards</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Board
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>

      <CreateBoardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}
