import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ onSearch = () => { } }) {
    const [city, setCity] = useState('');

    const handleSearch = () => {
        const trimmed = city.trim();
        if (trimmed) {
            onSearch(trimmed);
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
                    <FiSearch />
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
