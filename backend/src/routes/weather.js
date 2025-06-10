// src/routes/weather.js
import express from 'express';
import { getCurrentWeather } from '../controllers/weatherController.js';
import { cache } from '../middleware/cache.js';
const router = express.Router();
import { getHistory } from '../controllers/weatherController.js';
import {
  createFavorite,
  getFavorites,
  deleteFavorite
} from '../controllers/weatherController.js';

router.post('/favorites', createFavorite);

router.get('/favorites', getFavorites);

router.delete('/favorites/:id', deleteFavorite);

router.get('/history', getHistory);


router.get(
  '/current/:city',
  (req, res, next) => {
    req.cacheKey = `weather:current:${req.params.city.toLowerCase()}`;
    next();
  },
  cache,
  getCurrentWeather
);

export default router;

