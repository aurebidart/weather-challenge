import React from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import FavoritesList from './components/FavoritesList';
import WeatherHistory from './components/WeatherHistory';
import Loader from './components/Loader';

import styles from './App.module.css';
import { useWeather } from './context/WeatherContext';

function App() {
  const { unit, toggleUnit, loading } = useWeather();

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <Header unit={unit} onToggleUnit={toggleUnit} />
      <main className={styles.main}>
        <section>
          <WeatherCard />
          <ForecastList />
        </section>
        <div className={styles.bottomGrid}>
          <FavoritesList />
          <WeatherHistory />
        </div>
      </main>
    </div>
  );
}

export default App;
