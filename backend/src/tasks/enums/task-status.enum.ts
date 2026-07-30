/**
 * Define los estados permitidos para una tarea.
 *
 * El uso de un Enum evita utilizar cadenas de texto
 * distribuidas por toda la aplicación y reduce errores
 * de escritura.
 */
export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}