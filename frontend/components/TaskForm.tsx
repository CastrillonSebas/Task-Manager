'use client';

import { FormEvent, useState } from 'react';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onCreateTask: (title: string, description: string) => Promise<void>;
}

export default function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onCreateTask(
        normalizedTitle,
        description.trim(),
      );

      setTitle('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className={styles.formSection}
      aria-labelledby="task-form-title"
    >
      <header className={styles.formHeader}>
        <h2 id="task-form-title">Nueva tarea</h2>

        <p>
          Registra el título y una descripción opcional.
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.formGroup}>
          <label htmlFor="title">
            Título
            <span aria-hidden="true"> *</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            maxLength={100}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ejemplo: Revisar documentación"
            autoComplete="off"
            disabled={isSubmitting}
            required
          />

          <small>
            Máximo 100 caracteres.
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">
            Descripción
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Agrega información adicional sobre la tarea"
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creando...' : 'Crear tarea'}
          </button>
        </div>
      </form>
    </section>
  );
}