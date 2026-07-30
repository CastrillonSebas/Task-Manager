import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TaskStatus } from '../enums/task-status.enum';

/**
 * DTO utilizado para actualizar una tarea.
 *
 * Todos los campos son opcionales debido a que
 * el método PATCH permite actualizaciones parciales.
 */
export class UpdateTaskDto {
  /**
   * Nuevo título de la tarea.
   */
  @IsOptional()
  @IsString({
    message: 'El titulo debe contener caracteres',
  })
  @IsNotEmpty({
    message: 'El titulo no puede estar vacio',
  })
  @MaxLength(100, {
    message: 'El titulo no puede exceder los 100 caracteres',
  })
  title?: string;

  /**
   * Nueva descripción.
   */
  @IsOptional()
  @IsString({
     message: 'Agregue acá la descripción'
  })
  description?: string;

  /**
   * Nuevo estado de la tarea.
   */
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'El estatus de la tarea: PENDIENTE/COMPLETADA',
  })
  status?: TaskStatus;
}