import { redisClient } from '../../index.js';
import { saveSearch } from '../services/historyService.js';
import { fetchCurrentWeather, fetchForecast } from '../services/openWeatherService.js';

import { PrismaClient } from '@prisma/client';
import {
  addFavorite,
  listFavorites,
  removeFavorite
} from '../services/favoriteService.js';


export async function createFavorite(req, res, next) {
  const { city, country } = req.body;
  try {
    const favorite = await addFavorite(city, country);
    return res.status(201).json(favorite);
  } catch (err) {
    // P2002 = unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Favorite already exists' });
    }
    next(err);
  }
}

export async function getFavorites(req, res) {
  const favorites = await listFavorites();
  res.json(favorites);
}

export async function deleteFavorite(req, res) {
  const { id } = req.params;
  try {
    await removeFavorite(id);
    return res.status(204).send();
  } catch (err) {
    // Prisma throws if no record to delete ⇒ return 500 per your test
    return res.status(500).json({ error: 'Failed to delete favorite' });
  }
}

const prisma = new PrismaClient();

export async function getHistory(req, res) {
  const records = await prisma.weatherHistory.findMany({
    orderBy: { searchedAt: 'desc' },
    take: 50
  });
  res.json(records);
}

export async function getCurrentWeather(req, res) {
  const city = req.params.city;
  try {
    const data = await fetchCurrentWeather(city);
    // Save to history (fire-and-forget or await if you want error handling)
    saveSearch(city, data.sys.country, data).catch(console.error);
    return res.json(data);
  } catch (err) {
        console.error(err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }

}
export async function getForecast(req, res) {
  const city = req.params.city;
  try {
    const data = await fetchForecast(city);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
}
