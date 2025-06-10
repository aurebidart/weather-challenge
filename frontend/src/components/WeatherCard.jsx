import React from 'react';
import styles from './WeatherCard.module.css';
import { useWeather } from '../context/WeatherContext';
import {
    LuDroplets,
    LuStar,
    LuSunrise,
    LuSunset,
    LuWind
} from 'react-icons/lu';

function WeatherCard() {
    const { weatherData, unit, addFavorite } = useWeather();

    if (!weatherData) return null;

    const {
        city,
        country,
        temp,
        feels_like,
        humidity,
        wind,
        description,
        icon,
        sunrise,
        sunset,
        date
    } = weatherData;

    const convertTemp = (t) => unit === 'imperial' ? Math.round(t * 9 / 5 + 32) : t;
    const convertWind = (w) => unit === 'imperial' ? (w * 2.237).toFixed(1) : w;

    const unitSymbol = unit === 'imperial' ? '°F' : '°C';
    const windUnit = unit === 'imperial' ? 'mph' : 'm/s';

    const handleFavoriteClick = () => {
        addFavorite(city, country);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h2>
                        {city} <span className={styles.country}>({country})</span>
                    </h2>
                </div>
                <LuStar className={styles.starIcon} onClick={handleFavoriteClick} />
            </div>

            <div className={styles.content}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                        className={styles.icon}
                    />
                    <div className={styles.tempInfo}>
                        <div className={styles.tempTop}>
                            <div className={styles.temperature}>
                                <span className={styles.tempValue}>{convertTemp(temp)}</span>
                                <span className={styles.tempUnit}>{unitSymbol}</span>
                            </div>
                        </div>
                        <div className={styles.tempMiddle}>
                            <p className={styles.desc}>{description}</p>
                        </div>
                        <div className={styles.tempBottom}>
                            <p className={styles.feels}>Feels like {convertTemp(feels_like)}{unitSymbol}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className={styles.rightColumn}>
                    <p className={styles.date}>{date}</p>

                    <div className={styles.row}>
                        <p className={styles.info}>
                            <LuDroplets className={styles.iconBlue} />
                            Humidity: {humidity}%
                        </p>
                        <p className={styles.info}>
                            <LuWind className={styles.iconGray} />
                            Wind: {convertWind(wind)} {windUnit}
                        </p>
                    </div>

                    <div className={styles.row}>
                        <p className={styles.info}>
                            <LuSunrise className={styles.iconOrange} />
                            Sunrise: {sunrise}
                        </p>
                        <p className={styles.info}>
                            <LuSunset className={styles.iconRed} />
                            Sunset: {sunset}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
