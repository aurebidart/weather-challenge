import React from 'react';
import styles from './FavoritesList.module.css';
import { LuStar } from "react-icons/lu";

function FavoritesList({ favorites = [], onRemove = () => { }, onSelect = () => { } }) {
    return (
        <div className={styles.card}>
            <h4>
                <span className={styles.starWrapper}>
                    <LuStar className={styles.starIcon} />
                </span>
                Favorite Cities
            </h4>
            {favorites.length === 0 ? (
                <p className={styles.empty}>No favorite cities yet. Star a city to add it here.</p>
            ) : (
                <ul className={styles.list}>
                    {favorites.map((fav) => (
                        <li key={fav.id}>
                            <button className={styles.city} onClick={() => onSelect(fav.city_name)}>
                                {fav.city_name}, {fav.country_code}
                            </button>
                            <button className={styles.remove} onClick={() => onRemove(fav.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FavoritesList;
