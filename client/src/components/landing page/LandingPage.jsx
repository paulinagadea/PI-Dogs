import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <p className={styles.text}>Welcome to my first individual project!</p>
                <h1 className={styles.title}>Puppies App</h1>
                <Link to='/home'>
                    <button className={styles.button}>Go!</button>
                </Link>
            </div>
        </div>
    );
};