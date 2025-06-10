import React from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import FavoritesList from './components/FavoritesList';
import WeatherHistory from './components/WeatherHistory';

function App() {
  return (
    <div>
      <SearchBar />
      <WeatherCard />
      <ForecastList />
      <FavoritesList />
      <WeatherHistory />
    </div>
  );
}

export default App;
