// //src/pages/Aside/Aside.jsx
import React, { useMemo } from 'react';
import styles from './Aside.module.css';

// 이미지를 모두 import (확장자에 맞게 변경)
// src/pages/Aside/Aside.jsx
import cloud1 from '../../assets/cloud1.png';
import cloud2 from '../../assets/cloud2.png';
import cloud3 from '../../assets/cloud3.png';
import cloud4 from '../../assets/cloud4.png';
import cloud5 from '../../assets/cloud1.png';
import cloud6 from '../../assets/cloud2.png';
import cloud7 from '../../assets/cloud3.png';
import cloud8 from '../../assets/cloud4.png';
import cloud9 from '../../assets/cloud4.png';
import cloud10 from '../../assets/cloud1.png';
import cloud11 from '../../assets/cloud2.png';
import cloud12 from '../../assets/cloud3.png';
import cloud13 from '../../assets/cloud4.png';
import cloud14 from '../../assets/cloud1.png';
import cloud15 from '../../assets/cloud2.png';
import cloud16 from '../../assets/cloud3.png';

function Aside() {
    const clouds = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7, cloud8];

    // 구름 렌더링 파라미터를 최초 1회 생성
    const cloudConfigs = useMemo(() => {
        // 구름 개수: 이미지 수만큼
        return clouds.map((src, idx) => {
            // 10%~80% 사이의 랜덤 높이 위치
            const top = Math.floor(Math.random() * 70) + 10; // 10~80
            // 크기: 80~220px 사이
            const size = Math.floor(Math.random() * 140) + 80; // 80~220
            // 속도: 20~60초
            const duration = Math.floor(Math.random() * 40) + 20; // 20~60
            // 시작 지연: 0~20초
            const delay = Math.floor(Math.random() * 20); // 0~20
            // 약간의 투명도 변화
            const opacity = (Math.random() * 0.3 + 0.7).toFixed(2); // 0.70~1.00

            return {
                id: idx,
                src,
                top,
                size,
                duration,
                delay,
                opacity,
                zIndex: Math.random() > 0.5 ? 2 : 1,
            };
        });
    }, [clouds]);

    return (
        <div className={styles.page}>
            <div className={styles.cloudContainer}>
                <div className={`${styles.cloud} ${styles.cloud1}`} />
                <div className={`${styles.cloud} ${styles.cloud2}`} />
                <div className={`${styles.cloud} ${styles.cloud3}`} />
                <div className={`${styles.cloud} ${styles.cloud4}`} />
                <div className={`${styles.cloud} ${styles.cloud5}`} />
                <div className={`${styles.cloud} ${styles.cloud6}`} />
                <div className={`${styles.cloud} ${styles.cloud7}`} />
                <div className={`${styles.cloud} ${styles.cloud8}`} />
                <div className={`${styles.cloud} ${styles.cloud9}`} />
                <div className={`${styles.cloud} ${styles.cloud10}`} />
                <div className={`${styles.cloud} ${styles.cloud11}`} />
                <div className={`${styles.cloud} ${styles.cloud12}`} />
                <div className={`${styles.cloud} ${styles.cloud13}`} />
                <div className={`${styles.cloud} ${styles.cloud14}`} />
                <div className={`${styles.cloud} ${styles.cloud15}`} />
                <div className={`${styles.cloud} ${styles.cloud16}`} />
            </div>
        </div>
    );
}

export default Aside;
