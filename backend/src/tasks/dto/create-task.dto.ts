import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * DTO utilizado para la creación de una tarea.
 *
 * Define la estructura esperada de la información
 * enviada por el cliente y aplica las reglas de
 * validación correspondientes.
 */
export class CreateTaskDto {
  /**
   * Título de la tarea.
   *
   * Reglas:
   * - Obligatorio.
   * - No puede estar vacío.
   * - Máximo 100 caracteres.
   */
  @IsString({
    message: 'El titulo debe contener caracteres',
  })
  @IsNotEmpty({
    message: 'El titulo no puede estar vacio',
  })
  @MaxLength(100, {
    message: 'El titulo no puede exceder los 100 caracteres',
  })
  title!: string;

  /**
   * Descripción de la tarea.
   *
   * Es un campo opcional.
   */
  @IsOptional()
  @IsString({
    message: 'Agregue acá la descripción',
  })
  description?: string;
}