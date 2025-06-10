import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { LuSearch } from 'react-icons/lu';
import { useWeather } from '../context/WeatherContext'; // ✅ contexto

function SearchBar() {
    const [city, setCity] = useState('');
    const { searchCity } = useWeather(); // ✅ función desde contexto

    const handleSearch = () => {
        const trimmed = city.trim();
        if (trimmed) {
            searchCity(trimmed); // ✅ invoca al fetch
            setCity('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <span className={styles.icon} onClick={handleSearch}>
                    <LuSearch />
                </span>
            </div>
            <div className={styles.placeholder}>
                <button
                    className={styles.searchButton}
                    onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
