import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Task, TaskStatus } from '../lib/types';

export function useTasks(boardId?: string) {
  const { state, dispatch } = useApp();

  // Filter tasks by boardId if provided
  const tasks = useMemo(() => {
    if (!boardId) return state.tasks;
    return state.tasks.filter(task => task.boardId === boardId);
  }, [state.tasks, boardId]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const groups = {
      'todo': [] as Task[],
      'in-progress': [] as Task[],
      'done': [] as Task[],
    };

    tasks.forEach(task => {
      if (task.status in groups) {
        groups[task.status].push(task);
      }
    });

    return groups;
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>, status: TaskStatus = 'todo') => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
    
    // Add task ID to the board's taskIds array
    const board = state.boards.find(b => b.id === task.boardId);
    if (board) {
      dispatch({
        type: 'UPDATE_BOARD',
        payload: {
          ...board,
          taskIds: [...board.taskIds, newTask.id],
          updatedAt: new Date().toISOString(),
        },
      });
    }
    
    return newTask;
  }, [dispatch, state.boards]);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'boardId'>>) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return null;

    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    return updatedTask;
  }, [state.tasks, dispatch]);

  const deleteTask = useCallback((id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    // Remove task from its board's taskIds array
    const board = state.boards.find(b => b.id === task.boardId);
    if (board) {
      dispatch({
        type: 'UPDATE_BOARD',
        payload: {
          ...board,
          taskIds: board.taskIds.filter(taskId => taskId !== id),
          updatedAt: new Date().toISOString(),
        },
      });
    }
    
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, [state.tasks, state.boards, dispatch]);

  const moveTask = useCallback((taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status });
  }, [updateTask]);

  // Get tasks by board ID
  const getTasksByBoardId = useCallback((boardId: string): Task[] => {
    return state.tasks.filter(task => task.boardId === boardId);
  }, [state.tasks]);

  // Get tasks by status (optionally filtered by board)
  const getTasksByStatus = useCallback((status: TaskStatus, boardId?: string): Task[] => {
    let filtered = state.tasks.filter(task => task.status === status);
    if (boardId) {
      filtered = filtered.filter(task => task.boardId === boardId);
    }
    return filtered;
  }, [state.tasks]);

  // Get a single task by ID
  const getTaskById = useCallback((id: string): Task | undefined => {
    return state.tasks.find(task => task.id === id);
  }, [state.tasks]);

  return {
    tasks,
    tasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByBoardId: (boardId: string): Task[] => {
      return state.tasks.filter(task => task.boardId === boardId);
    },
    getTasksByStatus: (status: TaskStatus, boardId?: string): Task[] => {
      let filtered = state.tasks.filter(task => task.status === status);
      if (boardId) {
        filtered = filtered.filter(task => task.boardId === boardId);
      }
      return filtered;
    },
    getTaskById: (id: string): Task | undefined => {
      return state.tasks.find(task => task.id === id);
    },
  };
}
