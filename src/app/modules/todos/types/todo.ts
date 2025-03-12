export interface GetTodosResponse {
  message: string;
  task: Todo[];
}

export interface UpdateTodoResponse {
  message: string;
  task: Todo;
}

export interface CreateTodoResponse {
  message: string;
  task: Todo;
}

export interface DeleteTodoResponse {
  message: string;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

export interface UpdateTodoRequest {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export const PrioritySortOrder: Record<Priority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};
