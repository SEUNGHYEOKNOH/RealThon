// src/pages/Main/Main.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header'; // Header 경로 확인!
import Loading from '../../components/ui/Loading/Loading';
import styles from './Main.module.css';

function Main() {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (percent === 0 && isLoading) {
            const wait = setTimeout(() => setPercent(1), 500);
            return () => clearTimeout(wait);
        }
        if (percent > 0 && percent < 90 && isLoading) {
            const interval = setInterval(() => {
                setPercent((prev) => Math.min(prev + 1, 90));
            }, 22);
            return () => clearInterval(interval);
        }
        if (percent >= 90 && percent < 100 && isLoading) {
            const interval = setInterval(() => {
                setPercent((prev) => Math.min(prev + 1, 100));
            }, 80);
            return () => clearInterval(interval);
        }
        if (percent === 100 && isLoading) {
            const timeout = setTimeout(() => setIsLoading(false), 600);
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    if (isLoading) return <Loading percent={percent} />;

    // Header + Main 컨텐츠 함께 렌더
    return (
        <div>
            <Header />
            <div className={styles.mainContainer}>
                {/* Main page content */}
                <h2>메인 페이지 컨텐츠!</h2>
            </div>
        </div>
    );
}

export default Main;
