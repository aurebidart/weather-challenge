import request from 'supertest';
import app from '../index.js';

describe('Favorites API', () => {
  let favId;

  it('POST /api/weather/favorites → 201 + body', async () => {
    const res = await request(app)
      .post('/api/weather/favorites')
      .send({ city: 'Berlin', country: 'DE' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.city).toBe('Berlin');
    favId = res.body.id;
  });

  it('POST duplicate favorite → 409 + error message', async () => {
    const res = await request(app)
      .post('/api/weather/favorites')
      .send({ city: 'Berlin', country: 'DE' });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: 'Favorite already exists' });
  });

  it('GET /api/weather/favorites → includes the new favorite', async () => {
    const res = await request(app).get('/api/weather/favorites');
    expect(res.status).toBe(200);
    expect(res.body.some(f => f.id === favId)).toBe(true);
  });

  it('POST /api/weather/favorites without city → 400 + error message', async () => {
    const res = await request(app)
      .post('/api/weather/favorites')
      .send({ country: 'US' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'city is required' });
  });

  it('DELETE /api/weather/favorites/:id → 204', async () => {
    const res = await request(app).delete(`/api/weather/favorites/${favId}`);
    expect(res.status).toBe(204);
  });

  it('DELETE non-existent favorite → 500', async () => {
    const res = await request(app).delete('/api/weather/favorites/999999');
    expect(res.status).toBe(500);
  });
});

