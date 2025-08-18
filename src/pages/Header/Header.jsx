import React from 'react';
import styles from './Header.module.css';

function Header({ isLoggedIn, onSignIn, onSignUp, onLogout }) {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.titleSection}>MEA MAPPA CAELESTIS</div>

            <div className={styles.authSection}>
                {isLoggedIn ? (
                    <button className={styles.authButton} onClick={onLogout}>
                        Log Out
                    </button>
                ) : (
                    <>
                        <button className={styles.authButton} onClick={onSignIn}>
                            Sign In
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
