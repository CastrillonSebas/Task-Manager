import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../enums/task-status.enum';

interface UpdateTaskData {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}

/**
 * Repositorio encargado exclusivamente del acceso
 * a la tabla `tasks`.
 */
@Injectable()
export class TasksRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Obtiene todas las tareas.
   */
  async findAll(): Promise<Task[]> {
    const query = `
      SELECT
        id,
        title,
        description,
        status,
        created_at AS "createdAt"
      FROM tasks
      ORDER BY created_at DESC;
    `;

    const result = await this.databaseService.query<Task>(query);

    return result.rows;
  }

  /**
   * Busca una tarea por su identificador.
   */
  async findById(id: number): Promise<Task | null> {
    const query = `
      SELECT
        id,
        title,
        description,
        status,
        created_at AS "createdAt"
      FROM tasks
      WHERE id = $1;
    `;

    const result = await this.databaseService.query<Task>(query, [id]);

    return result.rows[0] ?? null;
  }

  /**
   * Crea una tarea.
   */
  async create(
    title: string,
    description: string | null,
    status: TaskStatus,
  ): Promise<Task> {
    const query = `
      INSERT INTO tasks (
        title,
        description,
        status
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        title,
        description,
        status,
        created_at AS "createdAt";
    `;

    const result = await this.databaseService.query<Task>(query, [
      title,
      description,
      status,
    ]);

    return result.rows[0];
  }

  /**
   * Actualiza únicamente los campos enviados por el cliente.
   */
  async update(id: number, data: UpdateTaskData): Promise<Task | null> {
    const query = `
      UPDATE tasks
      SET
        title = COALESCE($2, title),
        description = CASE
          WHEN $3::boolean THEN $4
          ELSE description
        END,
        status = COALESCE($5, status)
      WHERE id = $1
      RETURNING
        id,
        title,
        description,
        status,
        created_at AS "createdAt";
    `;

    const descriptionWasProvided = data.description !== undefined;

    const values = [
      id,
      data.title ?? null,
      descriptionWasProvided,
      data.description ?? null,
      data.status ?? null,
    ];

    const result = await this.databaseService.query<Task>(query, values);

    return result.rows[0] ?? null;
  }

  /**
   * Elimina una tarea por su identificador.
   */
  async remove(id: number): Promise<boolean> {
    const query = `
      DELETE FROM tasks
      WHERE id = $1;
    `;

    const result = await this.databaseService.query(query, [id]);

    return (result.rowCount ?? 0) > 0;
  }
}