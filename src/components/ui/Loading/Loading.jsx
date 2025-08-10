// src/components/ui/Loading/Loading.jsx
import React from 'react';
import styles from './Loading.module.css';

// 경로 주의: ui/Loading에서 assets까지 3단계 위로 올라감!
import cloudTop from '../../../assets/cloud-top.png'; // or .jpg 실제 파일 확인
import cloudBottom from '../../../assets/cloud-bottom.png';
import cloudLeft from '../../../assets/cloud-left.png';
import cloudRight from '../../../assets/cloud-right.png';

function Loading({ percent }) {
    const maxMoveY = 180;
    const maxMoveX = 220;

    const topCloudY = (-percent / 100) * maxMoveY;
    const bottomCloudY = (percent / 100) * maxMoveY;
    const leftCloudX = (-percent / 100) * maxMoveX;
    const rightCloudX = (percent / 100) * maxMoveX;

    return (
        <div className={styles.loadingContainer}>
            {/* 구름 4방향 */}
            <img
                src={cloudTop}
                alt="top cloud"
                className={`${styles.cloud} ${styles.cloudTop}`}
                style={{
                    top: 0,
                    left: '50%',
                    transform: `translate(-50%, ${topCloudY}px)`,
                }}
            />
            <img
                src={cloudBottom}
                alt="bottom cloud"
                className={`${styles.cloud} ${styles.cloudBottom}`}
                style={{
                    bottom: 0,
                    left: '50%',
                    transform: `translate(-50%, ${bottomCloudY}px)`,
                }}
            />
            <img
                src={cloudLeft}
                alt="left cloud"
                className={`${styles.cloud} ${styles.cloudLeft}`}
                style={{
                    left: 0,
                    top: '50%',
                    transform: `translate(${leftCloudX}px, -50%)`,
                }}
            />
            <img
                src={cloudRight}
                alt="right cloud"
                className={`${styles.cloud} ${styles.cloudRight}`}
                style={{
                    right: 0,
                    top: '50%',
                    transform: `translate(${rightCloudX}px, -50%)`,
                }}
            />

            {/* 중앙 타이틀/소제목 */}
            <div className={styles.centerContent}>
                <h1>MEA MAPPA CAELESTIS</h1>
                <p>SINCE 2025</p>
            </div>

            {/* 진행률 바 & 퍼센트 */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${percent}%` }}></div>
                </div>
                <div className={styles.percentText}>{percent}%</div>
            </div>
        </div>
    );
}

export default Loading;
