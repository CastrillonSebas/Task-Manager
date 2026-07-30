import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { TasksRepository } from './repositories/tasks.repository';

/**
 * Servicio encargado de las reglas de negocio relacionadas
 * con las tareas.
 */
@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  /**
   * Obtiene todas las tareas.
   */
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  /**
   * Crea una tarea con estado inicial pendiente.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.create(
      createTaskDto.title,
      createTaskDto.description ?? null,
      TaskStatus.PENDING,
    );
  }

  /**
   * Actualiza una tarea existente.
   *
   * Lanza una excepción 404 cuando la tarea no existe.
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.tasksRepository.findById(id);

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    const updatedTask = await this.tasksRepository.update(id, updateTaskDto);

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    return updatedTask;
  }

  /**
   * Elimina una tarea existente.
   *
   * Lanza una excepción 404 cuando la tarea no existe.
   */
  async remove(id: number): Promise<void> {
    const wasDeleted = await this.tasksRepository.remove(id);

    if (!wasDeleted) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }
}