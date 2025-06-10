import React from 'react';
import styles from './ForecastList.module.css';
import { useWeather } from '../context/WeatherContext';

function ForecastList() {
    const { forecast, unit } = useWeather();

    if (!forecast || forecast.length === 0) {
        return <div className={styles.placeholder}>No forecast available</div>;
    }

    const convertTemp = (temp) => {
        return unit === 'imperial' ? Math.round(temp * 9 / 5 + 32) : temp;
    };

    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.title}>5-Day Forecast</h2>
            <div className={styles.list}>
                {forecast.map((item, idx) => (
                    <div className={styles.card} key={idx}>
                        <p className={styles.date}>{item.date}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                            alt={item.description}
                        />
                        <h4>{convertTemp(item.temp)}°{unit === 'imperial' ? 'F' : 'C'}</h4>
                        <p className={styles.desc}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastList;
