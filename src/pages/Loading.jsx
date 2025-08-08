import React from 'react';
import styles from './Loading.module.css';

import cloudTop from '../assets/cloud-top.png';
import cloudBottom from '../assets/cloud-bottom.png';
import cloudLeft from '../assets/cloud-left.png';
import cloudRight from '../assets/cloud-right.png';

function Loading({ percent }) {
    // 최대 이동 픽셀 (화면 밖으로 사라지도록)
    const maxMoveY = 180; // 상/하 구름 (180px)
    const maxMoveX = 220; // 좌/우 구름 (220px)

    // percent 기준 사방 이동 계산 (걷히는 만큼)
    // 0%일때    : 구름이 화면 중앙에 겹침
    // 100%일때  : 구름이 화면 밖으로 모두 이동

    const topCloudY = (-percent / 100) * maxMoveY; // 위에서 위로 이동
    const bottomCloudY = (percent / 100) * maxMoveY; // 아래서 아래로 이동
    const leftCloudX = (-percent / 100) * maxMoveX; // 왼쪽에서 왼쪽으로 이동
    const rightCloudX = (percent / 100) * maxMoveX; // 오른쪽에서 오른쪽으로 이동

    return (
        <div className={styles.loadingContainer}>
            {/* 구름 -- 사방 배치 */}
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

            {/* 가운데 텍스트 · 타이틀 */}
            <div className={styles.centerContent}>
                <h1>MEA MAPPA CAELESTIS</h1>
                <p>SINCE 2025</p>
            </div>

            {/* 진행률 · 프로그레스바 (중앙 아래) */}
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
