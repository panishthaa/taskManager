export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  labels?: string[];
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  taskIds: string[];
}

export interface AppState {
  boards: Board[];
  tasks: Task[];
  currentBoardId: string | null;
  theme: 'light' | 'dark';
}
