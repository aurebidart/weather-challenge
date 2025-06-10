import React from 'react';
import styles from './ForecastList.module.css';

function ForecastList({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return <div className={styles.placeholder}>No forecast available</div>;
    }

    return (
        <div className={styles.list}>
            {forecast.map((item, idx) => (
                <div className={styles.card} key={idx}>
                    <p className={styles.date}>{item.date}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.description}
                    />
                    <h4>{item.temp}°C</h4>
                    <p className={styles.desc}>{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ForecastList;
