// src/components/ui/Loading/Loading.jsx
import React from 'react';
import styles from './Loading.module.css';

// 이미지 경로는 기존 프로젝트 구조에 맞춰 조정하세요.
// 경로 주의: ui/Loading에서 assets까지 3단계 위로 올라감!
import cloudTop from '../../../assets/cloud-top.png';
import cloudBottom from '../../../assets/cloud-bottom.png';
import cloudLeft from '../../../assets/cloud-left.png';
import cloudRight from '../../../assets/cloud-right.png';

/*
  props:
    - percent: 0~100 로딩 진행률
  동작:
    - 상/하 구름은 Y축 이동(topCloudY, bottomCloudY)
    - 좌/우 구름은 X축 이동(leftCloudX, rightCloudX)
  개별 제어:
    - 각 이미지에 방향 공통 클래스 + 인덱스별 고유 클래스 부여
      예) className={`${styles.cloud} ${styles.cloudTop} ${styles.top0}`}
*/
function Loading({ percent = 0 }) {
    // 최대 이동량(뷰포트 크기에 따라 조절 가능)
    const maxMoveY = 180;
    const maxMoveX = 220;

    // 로딩 비율에 따른 이동값 계산
    const topCloudY = (-percent / 100) * maxMoveY;
    const bottomCloudY = (percent / 100) * maxMoveY;
    const leftCloudX = (-percent / 100) * maxMoveX;
    const rightCloudX = (percent / 100) * maxMoveX;

    // 3개씩 출력
    const triple = [0, 1, 2];

    return (
        <div className={styles.loadingContainer}>
            {/* 상단 구름 3개: 각자 width/left/opacity/z-index/transition-delay를 CSS에서 개별 제어 */}
            {triple.map((i) => (
                <img
                    key={`top-${i}`}
                    src={cloudTop}
                    alt={`top cloud ${i + 1}`}
                    className={`${styles.cloud} ${styles.cloudTop} ${styles['top' + i]}`}
                    // 이동량은 공통으로 percent 기반 적용, 필요시 index별 배율/방향 분기 가능
                    style={{
                        transform: `translate(-50%, ${topCloudY}px)`,
                    }}
                />
            ))}

            {/* 하단 구름 3개 */}
            {triple.map((i) => (
                <img
                    key={`bottom-${i}`}
                    src={cloudBottom}
                    alt={`bottom cloud ${i + 1}`}
                    className={`${styles.cloud} ${styles.cloudBottom} ${styles['bottom' + i]}`}
                    style={{
                        transform: `translate(-50%, ${bottomCloudY}px)`,
                    }}
                />
            ))}

            {/* 왼쪽 구름 3개 */}
            {triple.map((i) => (
                <img
                    key={`left-${i}`}
                    src={cloudLeft}
                    alt={`left cloud ${i + 1}`}
                    className={`${styles.cloud} ${styles.cloudLeft} ${styles['left' + i]}`}
                    style={{
                        transform: `translate(${leftCloudX}px, -50%)`,
                    }}
                />
            ))}

            {/* 오른쪽 구름 3개 */}
            {triple.map((i) => (
                <img
                    key={`right-${i}`}
                    src={cloudRight}
                    alt={`right cloud ${i + 1}`}
                    className={`${styles.cloud} ${styles.cloudRight} ${styles['right' + i]}`}
                    style={{
                        transform: `translate(${rightCloudX}px, -50%)`,
                    }}
                />
            ))}

            {/* 중앙 타이틀/소제목 */}
            <div className={styles.centerContent}>
                <h1>MEA MAPPA CAELESTIS</h1>
                <p>SINCE 2025</p>
            </div>

            {/* 진행률 바 & 퍼센트 */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                </div>
                <div className={styles.percentText}>{percent}%</div>
            </div>
        </div>
    );
}

export default Loading;
