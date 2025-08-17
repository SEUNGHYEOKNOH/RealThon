import React from 'react';
import styles from './Header.module.css';
// 필요시 헤더 배경 구름 import (이미지 파일 사용 시 활용 가능)
// import cloudTop from '../../assets/cloud-top.png';

function Header({ isLoggedIn, onSignIn, onSignUp, onLogout }) {
    return (
        <header className={styles.headerContainer}>
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
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
