# Task Manager

Aplicación web para gestionar tareas mediante un CRUD completo.

La solución está construida con:

- **Frontend:** Next.js + TypeScript
- **Backend:** NestJS + TypeScript
- **Base de datos:** PostgreSQL
- **Contenedores:** Docker y Docker Compose

---

## Funcionalidades

La aplicación permite:

- Consultar tareas.
- Crear tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Validar el título de una tarea.
- Manejar errores comunes del frontend y del backend.

---

## Estructura del proyecto

```text
task-manager/
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── database/
│   └── init.sql
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```



## Clonar el repositorio

```bash
git clone https://github.com/CastrillonSebas/Task-Manager.git
cd Task-Manager
```

---

## Ejecutar toda la aplicación

Desde la raíz del proyecto, donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up --build
```

Este comando construye y levanta al mismo tiempo:

- PostgreSQL
- Backend NestJS
- Frontend Next.js

La primera ejecución puede tardar algunos minutos porque Docker debe descargar las imágenes e instalar las dependencias.

---

## Acceso a la aplicación

Una vez que los contenedores estén activos:

- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:3000/api
- **Endpoint de tareas:** http://localhost:3000/api/tasks
- **PostgreSQL desde el equipo:** `localhost:5433`

---

## Verificar los contenedores

En otra terminal puedes ejecutar:

```bash
docker compose ps
```

Deberían aparecer estos servicios activos:

```text
task-manager-postgres
task-manager-backend
task-manager-frontend
```

---

## Endpoints disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tasks` | Consultar todas las tareas |
| POST | `/api/tasks` | Crear una tarea |
| PATCH | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |

### Crear una tarea

```json
{
  "title": "Revisar documentación",
  "description": "Validar las instrucciones del README"
}
```

### Marcar una tarea como completada

```json
{
  "status": "COMPLETED"
}
```

---

## Validaciones

La aplicación aplica validaciones tanto en frontend como en backend:

- El título es obligatorio.
- El título no puede contener únicamente espacios.
- El título permite máximo 100 caracteres.
- La descripción es opcional.
- Las tareas nuevas se crean con estado `PENDING`.
- Los estados permitidos son `PENDING` y `COMPLETED`.

---

## Base de datos

El archivo:

```text
database/init.sql
```

crea automáticamente:

- La tabla `tasks`.
- El índice `idx_tasks_status`.

El script se ejecuta únicamente cuando PostgreSQL inicializa el volumen por primera vez.

Para reinicializar completamente la base de datos:

```bash
docker compose down -v
docker compose up --build
```

> Este comando elimina los datos almacenados en PostgreSQL.

---

## Detener la aplicación

Presiona:

```text
Ctrl + C
```

en la terminal donde se está ejecutando Docker Compose.

Después ejecuta:

```bash
docker compose down
```

---
