import { useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Board } from '../lib/types';

export function useBoards() {
  const { state, dispatch } = useApp();

  const addBoard = useCallback((board: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'taskIds'>) => {
    const newBoard: Board = {
      ...board,
      id: crypto.randomUUID(),
      taskIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_BOARD', payload: newBoard });
    return newBoard;
  }, [dispatch]);

  const updateBoard = useCallback((id: string, updates: Partial<Omit<Board, 'id' | 'createdAt' | 'taskIds'>>) => {
    const board = state.boards.find(b => b.id === id);
    if (!board) return null;

    const updatedBoard: Board = {
      ...board,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'UPDATE_BOARD', payload: updatedBoard });
    return updatedBoard;
  }, [state.boards, dispatch]);

  const deleteBoard = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BOARD', payload: id });
    
    // If the deleted board was the current board, set current board to null
    if (state.currentBoardId === id) {
      dispatch({ type: 'SET_CURRENT_BOARD', payload: null });
    }
  }, [dispatch, state.currentBoardId]);

  const getBoard = useCallback((id: string) => {
    return state.boards.find(board => board.id === id);
  }, [state.boards]);

  const getCurrentBoard = useCallback(() => {
    if (!state.currentBoardId) return null;
    return state.boards.find(board => board.id === state.currentBoardId);
  }, [state.boards, state.currentBoardId]);

  const setCurrentBoard = useCallback((id: string | null) => {
    dispatch({ type: 'SET_CURRENT_BOARD', payload: id });
  }, [dispatch]);

  const getBoardById = useCallback((id: string): Board | undefined => {
    return state.boards.find(board => board.id === id);
  }, [state.boards]);

  return {
    boards: state.boards,
    currentBoard: getCurrentBoard(),
    currentBoardId: state.currentBoardId,
    addBoard,
    updateBoard,
    deleteBoard,
    getBoard,
    getBoardById,
    setCurrentBoard,
  };
}
