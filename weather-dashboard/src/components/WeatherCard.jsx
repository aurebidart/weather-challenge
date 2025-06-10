import React from 'react';
import styles from './WeatherCard.module.css';
import { LuDroplets, LuStar, LuSunrise, LuSunset, LuWind} from "react-icons/lu";

function WeatherCard() {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <h2>
                        New York <span className={styles.country}>(US)</span>
                    </h2>
                </div>
                <LuStar className={styles.starIcon} />
            </div>

            <div className={styles.content}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <img
                        src="https://openweathermap.org/img/wn/01d@2x.png"
                        alt="Clear Sky"
                        className={styles.icon}
                    />
                    <div className={styles.tempInfo}>
                        <div className={styles.tempTop}>
                            <div className={styles.temperature}>
                                <span className={styles.tempValue}>17</span>
                                <span className={styles.tempUnit}>°C</span>
                            </div>

                        </div>
                        <div className={styles.tempMiddle}>
                            <p className={styles.desc}>Clear Sky</p>
                        </div>
                        <div className={styles.tempBottom}>
                            <p className={styles.feels}>Feels like 16°C</p>
                        </div>
                    </div>
                </div>
                {/* Right Column */}
                <div className={styles.rightColumn}>
                    <p className={styles.date}>Sun, May 24</p>

                    <div className={styles.row}>
                        <p className={styles.info}>
                            <LuDroplets className={styles.iconBlue} />
                            Humidity: 76%
                        </p>
                        <p className={styles.info}>
                            <LuWind className={styles.iconGray} />
                            Wind: 3.6 m/s
                        </p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.info}>
                            <LuSunrise className={styles.iconOrange} />
                            Sunrise: 05:53 AM
                        </p>
                        <p className={styles.info}>
                            <LuSunset className={styles.iconRed} />
                            Sunset: 08:20 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
