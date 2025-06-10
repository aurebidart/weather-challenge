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

  it('GET /api/weather/favorites → array includes the new favorite', async () => {
    const res = await request(app).get('/api/weather/favorites');
    expect(res.status).toBe(200);
    expect(res.body.some(f => f.id === favId)).toBe(true);
  });

  it('DELETE /api/weather/favorites/:id → 204', async () => {
    const res = await request(app).delete(`/api/weather/favorites/${favId}`);
    expect(res.status).toBe(204);
  });
});
