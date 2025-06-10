import React from 'react';
import styles from './Loader.module.css';
import { LuCloudRain } from 'react-icons/lu';

function Loader() {
    return (
        <div className={styles.overlay}>
            <div className={styles.box}>
                <LuCloudRain className={styles.icon} />
                <p className={styles.text}>Loading weather...</p>
            </div>
        </div>
    );
}

export default Loader;
