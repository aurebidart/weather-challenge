import React, { useState } from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import FavoritesList from './components/FavoritesList';
import WeatherHistory from './components/WeatherHistory';

import styles from './App.module.css';

function App() {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className={styles.container}>
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
