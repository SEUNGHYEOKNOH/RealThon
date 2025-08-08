import React from 'react';
import styles from './loading.module.css';

// 이미지 import 방식 (require 사용 X)
import cloudLeft from '../assets/image1.png';
import cloudRight from '../assets/image2.png';

function Loading({ percent }) {
    // 걷힘 진행 정도에 따라 X축 이동 px 계산 (최대 300px 이동)
    const maxMove = 300;
    const leftCloudX = (-percent / 100) * maxMove;
    const rightCloudX = (percent / 100) * maxMove;

    return (
        <div className={styles.loadingContainer}>
            {/* 왼쪽 구름: 중앙에서 왼쪽(-X)으로 이동 */}
            <img
                src={cloudLeft}
                alt="왼쪽구름"
                className={styles.cloud}
                style={{
                    left: '50%',
                    transform: `translateX(calc(-100% + ${leftCloudX}px))`,
                }}
            />
            {/* 오른쪽 구름: 중앙에서 오른쪽(+X)으로 이동 */}
            <img
                src={cloudRight}
                alt="오른쪽구름"
                className={styles.cloud}
                style={{
                    left: '50%',
                    transform: `translateX(${rightCloudX}px)`,
                }}
            />

            {/* 중앙 텍스트/프로그레스바 */}
            <div className={styles.centerContent}>
                <h1>MEA MAPPA CAELESTISddd</h1>
                <p>SINCE 2025</p>
                <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                    </div>
                    <span className={styles.percentText}>{percent}%</span>
                </div>
            </div>
        </div>
    );
}

export default Loading;
