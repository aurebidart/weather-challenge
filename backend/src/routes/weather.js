// src/routes/weather.js
import { query, validationResult } from 'express-validator';
import { searchCities  } from '../controllers/cityController.js';
import express from 'express';
import { cache } from '../middleware/cache.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  createFavorite,
  getFavorites,
  deleteFavorite,
  getHistory,
  getCurrentWeather,
  getForecast,
  deleteHistory
} from '../controllers/weatherController.js';

const router = express.Router();

router.get('/forecast/:city', cache,asyncHandler(getForecast));

router.post('/favorites', asyncHandler(createFavorite));

router.get('/favorites', asyncHandler(getFavorites));

router.delete('/favorites/:id', asyncHandler(deleteFavorite));

router.get('/history', asyncHandler(getHistory));

router.delete('/history', asyncHandler(deleteHistory));


router.get(
  '/cities',
  query('q')
    .trim()
    .notEmpty().withMessage('q is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  searchCities
);


router.get(
  '/current/:city',
  (req, res, next) => {
    req.cacheKey = `weather:current:${req.params.city.toLowerCase()}`;
    next();
  },
  cache,
  getCurrentWeather
);

router.get(
  '/forecast/:city',
  (req, res, next) => {
    req.cacheKey = `weather:forecast:${req.params.city.toLowerCase()}`;
    next();
  },
  cache,
  getForecast
);

export default router;

