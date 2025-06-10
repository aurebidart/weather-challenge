// tests/weather.test.js
import request from 'supertest';
import app from '../index.js';    // your Express `export default app;`

describe('Weather API', () => {
  test('GET /health → 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/weather/current/London → has weather[]', async () => {
    const res = await request(app).get('/api/weather/current/London');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.weather)).toBe(true);
  });
});
