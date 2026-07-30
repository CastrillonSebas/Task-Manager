import { TaskStatus } from '../enums/task-status.enum';

/**
 * Representa una tarea dentro del dominio de la aplicación.
 *
 * Esta clase define la estructura de los datos que manejaremos
 * en el backend. No está asociada a un ORM.
 */
export class Task {
  /**
   * Identificador único de la tarea.
   */
  id!: number;

  /**
   * Título de la tarea.
   */
  title!: string;

  /**
   * Descripción de la tarea.
   */
  description!: string | null;

  /**
   * Estado actual de la tarea.
   */
  status!: TaskStatus;

  /**
   * Fecha de creación.
   */
  createdAt!: Date;
}