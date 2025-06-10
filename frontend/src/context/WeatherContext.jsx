import { createContext, useContext, useEffect, useState } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState('metric'); // 'metric' o 'imperial'

    useEffect(() => {
        fetchFavorites();
    }, []);

    const searchCity = async (city) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/weather/current/${city}`);
            if (!res.ok) throw new Error('City not found');
            const rawData = await res.json();

            const normalized = {
                id: rawData.id,
                city: rawData.name,
                country: rawData.sys.country,
                temp: Math.round(rawData.main.temp),
                feels_like: Math.round(rawData.main.feels_like),
                humidity: rawData.main.humidity,
                wind: rawData.wind.speed,
                description: rawData.weather[0].description,
                icon: rawData.weather[0].icon,
                sunrise: new Date(rawData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sunset: new Date(rawData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date(rawData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            };

            const forecastData = await getDailyForecast(city);

            setWeatherData(normalized);
            setForecast(forecastData);

            const histRes = await fetch(`http://localhost:3000/api/weather/history`);
            const hist = await histRes.json();
            setHistory(hist);
        } catch (err) {
            console.error('Error fetching weather:', err);
        } finally {
            setLoading(false);
        }
    };


    const getDailyForecast = async (cityName) => {
        const res = await fetch(`http://localhost:3000/api/weather/forecast/${cityName}`);
        if (!res.ok) throw new Error('Forecast fetch failed');
        const data = await res.json();

        const noonForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        return noonForecasts.slice(0, 5).map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            }),
            temp: Math.round(item.main.temp - 273.15),
            description: item.weather[0].description,
            icon: item.weather[0].icon
        }));
    };

    const addFavorite = async (city, country) => {
        try {
            const res = await fetch('http://localhost:3000/api/weather/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city, country })
            });
            if (!res.ok) throw new Error('Failed to add favorite');
            const newFav = await res.json();
            setFavorites((prev) => [...prev, newFav]);
        } catch (err) {
            console.error('Error adding favorite:', err);
        }
    };

    const removeFavorite = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/weather/favorites/${id}`, {
                method: 'DELETE',
            });
            // Refrescar favoritos desde el backend
            const res = await fetch('http://localhost:3000/api/weather/favorites');
            const data = await res.json();
            setFavorites(data);
        } catch (err) {
            console.error('Error removing favorite:', err);
        }
    };

    const fetchFavorites = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/weather/favorites');
            const data = await res.json();
            setFavorites(data);
        } catch (err) {
            console.error('Error fetching favorites:', err);
        }
    };

    const clearHistory = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/weather/history', {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to clear history');

            setHistory([]);
        } catch (err) {
            console.error('Error clearing history:', err);
        }
    };

    const toggleUnit = () =>
        setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                forecast,
                favorites,
                history,
                unit,
                addFavorite,
                clearHistory,
                searchCity,
                clearHistory,
                toggleUnit,
                removeFavorite,
                fetchFavorites,
                loading,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => useContext(WeatherContext);
