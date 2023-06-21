import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';

const Navbar = () => {
return (
    <nav className={styles.navContainer}>
    <ul className={styles.navButtons}>
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/movies">Movies</Link>
        </li>
    </ul>
    </nav>
);
};

export default Navbar;
