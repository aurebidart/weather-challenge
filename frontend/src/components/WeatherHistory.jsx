import React from 'react';
import styles from './WeatherHistory.module.css';
import { LuClock, LuTrash2 } from 'react-icons/lu';
import { useWeather } from '../context/WeatherContext';

function WeatherHistory({ onSelect = () => {} }) {
    const { history, clearHistory, searchCity } = useWeather();

    

    return (
        <div className={styles.card}>
            <h4>
                <LuClock className={styles.clockIcon} /> Search History
            </h4>
            {history.length === 0 ? (
                <p className={styles.empty}>No search history yet</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {history.map((entry) => (
                            <li key={entry.id}>
                                <button
                                    className={styles.city}
                                    onClick={() => searchCity(entry.city)}
                                >
                                    {entry.city}, {entry.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className={styles.clear} onClick={clearHistory}>
                        <LuTrash2 className={styles.trashIcon} /> Clear History
                    </button>
                </>
            )}
        </div>
    );
}

export default WeatherHistory;
