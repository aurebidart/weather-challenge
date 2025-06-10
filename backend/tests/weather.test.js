import request from 'supertest';
import app from '../index.js';

describe('Forecast API', () => {
  it('GET /api/weather/forecast/:city → 200 + list[]', async () => {
    const res = await request(app).get('/api/weather/forecast/London');
    expect(res.status).toBe(200);
    // La API de OpenWeatherMap devuelve un objeto con la propiedad `list` como array de forecasts
    expect(res.body).toHaveProperty('list');
    expect(Array.isArray(res.body.list)).toBe(true);
  });

  it('Cachea la segunda llamada', async () => {
    // Primera llamada para poblar cache
    const first = await request(app).get('/api/weather/forecast/Paris');
    expect(first.status).toBe(200);
    // Segunda llamada: debería devolver el mismo JSON
    const second = await request(app).get('/api/weather/forecast/Paris');
    expect(second.status).toBe(200);
    expect(second.body).toEqual(first.body);
  });
});
