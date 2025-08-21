'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBoards } from '../../hooks/useBoards';
import { useTasks } from '../../hooks/useTasks';
import { Task, TaskStatus } from '../../lib/types';
import BoardHeader from '../../components/board/BoardHeader';
import StatusColumn from '../../components/board/StatusColumn';
import TaskModal from '../../components/board/TaskModal';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function BoardPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getBoardById } = useBoards();
  const { tasks, addTask, updateTask, deleteTask, getTasksByBoardId } = useTasks();
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const board = getBoardById(id as string);
  const boardTasks = getTasksByBoardId(id as string) || [];

  // Redirect to home if board doesn't exist
  useEffect(() => {
    if (!board && id) {
      router.push('/');
    }
  }, [board, id, router]);

  if (!board) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading board...</p>
        </div>
      </div>
    );
  }

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask({
        ...taskData,
        boardId: id as string,
      });
    }
  };

  // Get tasks by status for the current board
  const getTasksForStatus = (status: TaskStatus): Task[] => {
    return boardTasks.filter((task: Task) => task.status === status);
  };

  const statusColumns = [
    { status: 'todo' as const, title: 'To Do' },
    { status: 'in-progress' as const, title: 'In Progress' },
    { status: 'done' as const, title: 'Done' },
  ];

  return (
    <div className="p-4 md:p-6">
      <BoardHeader 
        board={board} 
        onAddTask={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusColumns.map(({ status, title }) => {
          const tasksForStatus = getTasksForStatus(status);
          return (
            <StatusColumn
              key={status}
              status={status}
              title={`${title} (${tasksForStatus.length})`}
              tasks={tasksForStatus}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          );
        })}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        taskToEdit={editingTask}
        boardId={id as string}
      />
    </div>
  );
}
