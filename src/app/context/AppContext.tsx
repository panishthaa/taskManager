'use client';

import { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';
import { AppState, Board, Task } from '../lib/types';

// Define action types
type Action =
  | { type: 'SET_BOARDS'; payload: Board[] }
  | { type: 'ADD_BOARD'; payload: Board }
  | { type: 'UPDATE_BOARD'; payload: Board }
  | { type: 'DELETE_BOARD'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_CURRENT_BOARD'; payload: string | null };

// Initial state
const initialState: AppState = {
  boards: [],
  tasks: [],
  currentBoardId: null,
  theme: 'light',
};

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.payload };
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.payload] };
    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.id ? action.payload : board
        ),
      };
    case 'DELETE_BOARD':
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload),
        // Also remove all tasks associated with this board
        tasks: state.tasks.filter(task => task.boardId !== action.payload),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_CURRENT_BOARD':
      return { ...state, currentBoardId: action.payload };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('taskManagerState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        if (parsedState.boards) dispatch({ type: 'SET_BOARDS', payload: parsedState.boards });
        if (parsedState.tasks) dispatch({ type: 'SET_TASKS', payload: parsedState.tasks });
        if (parsedState.currentBoardId) {
          dispatch({ type: 'SET_CURRENT_BOARD', payload: parsedState.currentBoardId });
        }
      } catch (error) {
        console.error('Failed to parse saved state', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('taskManagerState', JSON.stringify({
      boards: state.boards,
      tasks: state.tasks,
      currentBoardId: state.currentBoardId,
    }));
  }, [state.boards, state.tasks, state.currentBoardId]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
