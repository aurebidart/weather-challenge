# Weather Dashboard Backend

This Express.js service provides weather data, history, and user favorites, fully containerized via Docker Compose.

---

## 🔥 Quick Start with Docker

1. **Clone repo** and `cd backend` (if not already there).
2. Create and edit `.env`:

   ```dotenv
   OPENWEATHER_API_KEY=your_openweather_api_key
   REDIS_URL=redis://redis:6379
   DATABASE_URL=postgresql://weather_user:strongpassword@db:5432/weatherdb
   ```
3. From the repo root (where `docker-compose.yml` lives), run:

   ```bash
   docker-compose up --build -d
   ```
4. Verify services:

   ```bash
   curl http://localhost:3000/health
   # { "status": "ok" }
   ```

---

## 🧪 Running Tests

All tests use Jest + Supertest, run inside Docker:

```bash
# Ensure db & redis are up
docker-compose up -d db redis
# Apply migrations
docker-compose run --rm backend npx prisma migrate deploy
# Run test suite
docker-compose run --rm backend npm test
```

---

## 📚 Environment Variables

| Variable              | Description                  |
| --------------------- | ---------------------------- |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key       |
| `REDIS_URL`           | Redis connection string      |
| `DATABASE_URL`        | PostgreSQL connection string |

---

## 🚀 API Endpoints

### Weather

| Method | URL                           | Description          | Response Example                 |
| ------ | ----------------------------- | -------------------- | -------------------------------- |
| GET    | `/api/weather/current/:city`  | Current weather data | Raw OWM JSON payload             |
| GET    | `/api/weather/forecast/:city` | 5-day forecast       | `{ list: [ { dt: ..., ... } ] }` |

### Autocomplete

| Method | URL                            | Description               | Response                                          |
| ------ | ------------------------------ | ------------------------- | ------------------------------------------------- |
| GET    | `/api/weather/cities?q={term}` | City name search (max 10) | `[ { id, name, state, country, lat, lon }, ... ]` |

### Favorites

| Method | URL                          | Description     | Body / Response                             |
| ------ | ---------------------------- | --------------- | ------------------------------------------- |
| POST   | `/api/weather/favorites`     | Add a favorite  | Body: `{ city, country? }`                  |
|        |                              |                 | 201: `{ id, city, country, addedAt }`       |
|        |                              |                 | 400: validation errors                      |
|        |                              |                 | 409: `{ error: 'Favorite already exists' }` |
| GET    | `/api/weather/favorites`     | List favorites  | `[ { id, city, country, addedAt }, ... ]`   |
| DELETE | `/api/weather/favorites/:id` | Remove favorite | 204 on success; 400/500 on error            |

### History

| Method | URL                    | Description       | Response                                           |
| ------ | ---------------------- | ----------------- | -------------------------------------------------- |
| GET    | `/api/weather/history` | Search history    | `[ { id, city, country, searchedAt, data }, ... ]` |
| DELETE | `/api/weather/history` | Clear all history | 204 No Content                                     |

---

## ⚙️ Additional Features

* **Input validation & sanitization** with `express-validator`.
* **Centralized error-handling** middleware for JSON errors and 404.
* **Rate limiting** via `express-rate-limit` (60 requests/min per IP).
* **Response caching** on `/current` and `/forecast` using Redis (5 min TTL).
* **Async wrapper** ensures all route handlers propagate errors properly.


