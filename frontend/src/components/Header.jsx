import React from 'react';
import SearchBar from './SearchBar';
import styles from './Header.module.css';
import { LuThermometer, LuCloud } from "react-icons/lu";
import { useWeather } from '../context/WeatherContext';

function Header() {
  const { unit, toggleUnit } = useWeather();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.title}>
          <LuCloud className={styles.logo} />
          <h2>Weather Dashboard</h2>
        </div>
        <div className={styles.unitToggle}>
          <label>
            °C
            <input
              type="checkbox"
              checked={unit === 'imperial'}
              onChange={toggleUnit}
            />
            °F
          </label>
          <LuThermometer className={styles.thermometer} />
        </div>
      </div>

      <div className={styles.bottomRow}>
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
