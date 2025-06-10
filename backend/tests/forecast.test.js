import app from '../index.js';
import request from 'supertest';

it('GET /api/weather/forecast/:city → 200 + array of forecasts', async () => {
  const res = await request(app).get('/api/weather/forecast/London');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.list)).toBe(true);
});
