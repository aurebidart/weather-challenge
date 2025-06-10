# Weather Dashboard Backend

Este repositorio contiene la implementación del **backend** del Weather Dashboard, construido con Node.js, Express, Redis y PostgreSQL, utilizando Prisma como ORM. Hasta ahora incluye:

* **Healthcheck**: endpoint para verificar que el servicio está activo.
* **Current Weather**: obtiene el clima actual de OpenWeatherMap y lo cachea en Redis.
* **Search History**: persiste cada búsqueda en PostgreSQL con Prisma.
* **Favorites CRUD**: permite agregar, listar y eliminar ciudades favoritas.
* **Pruebas Automatizadas**: tests con Jest y Supertest.
* **Contenerización**: Dockerfile y Docker Compose para Redis, Postgres y backend.

---

## Tech Stack

* **Runtime:** Node.js 18
* **Framework:** Express
* **Cache:** Redis
* **Base de datos:** PostgreSQL
* **ORM:** Prisma
* **Testing:** Jest + Supertest
* **Contenerización:** Docker & Docker Compose

---

## Estructura de Proyecto

```
backend/
├── Dockerfile
├── docker-compose.yml   # Orquestación de Redis, Postgres y backend
├── package.json
├── .env.example
├── index.js             # App Express + configuración
├── prisma/
│   └── schema.prisma    # Esquema de DataSource y modelos
├── src/
│   ├── routes/
│   │   └── weather.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── services/
│   │   ├── openWeatherService.js
│   │   ├── historyService.js
│   │   └── favoriteService.js
│   └── middleware/
│       └── cache.js
└── tests/
    ├── weather.test.js
    └── favorites.test.js
```

---

## Variables de Entorno

Copia el archivo de ejemplo y ajusta tus credenciales:

```bash
cp .env.example .env
```

* `OPENWEATHER_API_KEY` – tu clave de OpenWeatherMap.
* `REDIS_URL` – e.g. `redis://localhost:6379` o `redis://redis:6379` en Docker.
* `DATABASE_URL` – e.g. `postgresql://weather_user:strongpassword@localhost:5432/weatherdb` o `postgresql://weather_user:strongpassword@db:5432/weatherdb` en Docker.

---

## Instalación y Ejecución Local

1. Instala dependencias:

   ```bash
   cd backend
   npm install
   ```
2. Genera cliente Prisma y aplica migraciones:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
3. Arranca el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```
4. Verifica endpoints:

   ```bash
   curl http://localhost:3000/health
   curl http://localhost:3000/api/weather/current/London
   curl http://localhost:3000/api/weather/history
   ```

---

## Docker Compose

Para levantar todo con Docker:

```bash
# Desde la raíz del proyecto (donde está docker-compose.yml)

docker-compose up --build -d
```

* **Redis** en `6379`
* **Postgres** en `5432`
* **Backend** en `3000`

---

## Pruebas

Ejecuta los tests unitarios y de integración:

```bash
npm test
```

---

## Endpoints Disponibles

| Método | Ruta                         | Descripción                              |
| ------ | ---------------------------- | ---------------------------------------- |
| GET    | `/health`                    | Verifica que el servicio esté activo.    |
| GET    | `/api/weather/current/:city` | Clima actual para `:city` (cache Redis). |
| GET    | `/api/weather/history`       | Historial de búsquedas (PostgreSQL).     |
| POST   | `/api/weather/favorites`     | Agrega ciudad favorita.                  |
| GET    | `/api/weather/favorites`     | Lista ciudades favoritas.                |
| DELETE | `/api/weather/favorites/:id` | Elimina ciudad favorita por ID.          |

---
