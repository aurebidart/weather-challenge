import React from 'react';
import styles from './WeatherHistory.module.css';
import { LuClock, LuTrash2 } from 'react-icons/lu';

function WeatherHistory({ history = [], onSelect = () => { }, onClear = () => { } }) {
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
                                    onClick={() => onSelect(entry.city_name)}
                                >
                                    {entry.city_name}, {entry.country_code}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className={styles.clear} onClick={onClear}>
                        <LuTrash2 className={styles.trashIcon} /> Clear History
                    </button>
                </>
            )}
        </div>
    );
}

export default WeatherHistory;
