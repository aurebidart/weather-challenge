// src/services/openWeatherService.js
import axios from 'axios';

export async function fetchCurrentWeather(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}
export async function fetchForecast(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast`
            + `?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
}
