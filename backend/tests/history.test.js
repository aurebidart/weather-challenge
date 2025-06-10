import request from 'supertest';
import app from '../index.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


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

describe('History Deletion API', () => {
  // Seed some history entries before testing delete
  beforeAll(async () => {
    await prisma.weatherHistory.createMany({
      data: [
        { city: 'SeedCity1', country: 'SC', data: {} },
        { city: 'SeedCity2', country: 'SC', data: {} },
      ]
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('DELETE /api/weather/history → 204 No Content', async () => {
    const res = await request(app).delete('/api/weather/history');
    expect(res.status).toBe(204);
  });

  it('GET /api/weather/history → empty array after deletion', async () => {
    const res = await request(app).get('/api/weather/history');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
