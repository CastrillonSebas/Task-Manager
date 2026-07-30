'use client';

import { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '@/services/tasks.service';
import { Task } from '@/types/task';
import styles from './page.module.css';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError('No fue posible cargar las tareas');
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(
    title: string,
    description: string,
  ): Promise<void> {
    try {
      setError(null);

      const newTask = await createTask({
        title,
        description: description || undefined,
      });

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);
    } catch {
      setError('No fue posible crear la tarea');
      throw new Error('No fue posible crear la tarea');
    }
  }

  async function handleCompleteTask(id: number): Promise<void> {
    try {
      setError(null);

      const updatedTask = await updateTask(id, {
        status: 'COMPLETED',
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
    } catch {
      setError('No fue posible actualizar la tarea');
    }
  }

  async function handleDeleteTask(id: number): Promise<void> {
    try {
      setError(null);

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id),
      );
    } catch {
      setError('No fue posible eliminar la tarea');
    }
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p>Cargando tareas...</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Gestor de tareas</h1>

          <p>
            Crea, completa y elimina tus tareas.
          </p>
        </header>

        <TaskForm onCreateTask={handleCreateTask} />

        {error && (
          <p
            className={styles.errorMessage}
            role="alert"
          >
            {error}
          </p>
        )}

        <section
          className={styles.tasksSection}
          aria-labelledby="tasks-title"
        >
          <h2 id="tasks-title">Tareas registradas</h2>

          <TaskList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </div>
    </main>
  );
}