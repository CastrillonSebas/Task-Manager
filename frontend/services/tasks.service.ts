import { Task, TaskStatus } from '@/types/task';

const API_URL = 'http://localhost:3000/api/tasks';

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('No fue posible obtener las tareas');
  }

  return response.json();
}

export async function createTask(
  task: CreateTaskData,
): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('No fue posible crear la tarea');
  }

  return response.json();
}

export async function updateTask(
  id: number,
  task: UpdateTaskData,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('No fue posible actualizar la tarea');
  }

  return response.json();
}
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No fue posible eliminar la tarea');
  }
}