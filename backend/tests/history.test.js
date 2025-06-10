import request from 'supertest';
import app from '../index.js';

describe('History API', () => {
  it('GET /api/weather/history → 200 & returns an array', async () => {
    const res = await request(app).get('/api/weather/history');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('after calling current-weather, history includes that city', async () => {
    const city = 'Tokyo';
    // trigger a search (and persistence)
    await request(app).get(`/api/weather/current/${city}`);
    // now fetch history
    const res = await request(app).get('/api/weather/history');
    expect(res.status).toBe(200);
    const cities = res.body.map(r => r.city.toLowerCase());
    expect(cities).toContain(city.toLowerCase());
  });
});
