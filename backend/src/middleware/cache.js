// src/middleware/cache.js
import { redisClient } from '../../index.js';

export async function cache(req, res, next) {
  const key = req.cacheKey;
  const cached = await redisClient.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  // Monkey-patch res.json to cache
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    redisClient.set(key, JSON.stringify(body), 'EX', 300); // 5 min
    return originalJson(body);
  };
  next();
}
