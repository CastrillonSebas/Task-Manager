/*
 * Crea la tabla de tareas.
 *
 * Esta tabla almacena la información principal del sistema.
 */

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,

    title VARCHAR(100) NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
 * Índice para optimizar consultas por estado.
 */
CREATE INDEX IF NOT EXISTS idx_tasks_status
ON tasks(status);