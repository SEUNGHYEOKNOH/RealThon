import React from 'react';
import styles from './Header.module.css';
// 필요시 헤더 배경 구름 import (이미지 파일 사용 시 활용 가능)
// import cloudTop from '../../assets/cloud-top.png';

function Header({ isLoggedIn, onSignIn, onSignUp, onLogout }) {
    return (
        <header className={styles.headerContainer}>
            {/* 햄버거 메뉴 */}
            <button className={styles.menuButton} aria-label="메뉴">
                <span className={styles.menuIcon}>☰</span>
            </button>

            {/* 사이트 타이틀 */}
            <div className={styles.titleSection}>MEA MAPPA CAELESTIS</div>

            {/* 오른쪽: 로그인/로그아웃/회원가입 */}
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
                        <button className={styles.authButton} onClick={onSignUp}>
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
