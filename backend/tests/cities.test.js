import request from 'supertest';
import app     from '../index.js';

describe('City Autocomplete API', () => {
  it('GET /api/weather/cities without q → 400 validation error', async () => {
    const res = await request(app).get('/api/weather/cities');
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors[0].path).toBe('q');
  });

  it('GET /api/weather/cities?q=Lon → 200 + array of matching cities', async () => {
    const prefix = 'Lon';
    const res = await request(app).get(`/api/weather/cities?q=${prefix}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    // each returned city's name should start with "Lon" (case-insensitive)
    res.body.forEach(city => {
      expect(city.name.toLowerCase().startsWith(prefix.toLowerCase())).toBe(true);
      expect(typeof city.country).toBe('string');
      expect(typeof city.lat).toBe('number');
      expect(typeof city.lon).toBe('number');
    });
  });

  it('respects the limit (max 10 results)', async () => {
    const res = await request(app).get('/api/weather/cities?q=a');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(10);
  });
});
