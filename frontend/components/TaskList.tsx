import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: number) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
}

export default function TaskList({
  tasks,
  onCompleteTask,
  onDeleteTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No hay tareas registradas.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h2>{task.title}</h2>

          <p>{task.description ?? 'Sin descripción'}</p>

          <p>Estado: {task.status}</p>

          {task.status === 'PENDING' && (
            <button
              type="button"
              onClick={() => onCompleteTask(task.id)}
            >
              Completar
            </button>
          )}

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}