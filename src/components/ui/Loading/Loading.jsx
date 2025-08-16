// src/components/ui/Loading/Loading.jsx
// - 요구사항: 6개 구름 각각의 움직임(거리)과 속도(지속시간)를 개별 제어
// - 방식:
//   1) percent(0~100)를 0~1로 정규화해 --t로 CSS에 전달.
//   2) 개별 이미지마다 커스텀 CSS 변수 전달:
//      - 위로 사라지는 타입(raiseUpToOut): --rise, --extraRise, --dur, --ease
//      - 아래로 이동 타입(lowerToHalf): --downRatio, --dur, --ease
//   3) 값만 바꾸면 개별 속도/거리 튜닝 가능.

import React from 'react';
import styles from './Loading.module.css';

import cloudTop from '../../../assets/cloud-top.png';
import cloudBottom from '../../../assets/cloud-bottom.png';
import cloudLeft from '../../../assets/cloud-left.png';
import cloudRight from '../../../assets/cloud-right.png';

function Loading({ percent = 0 }) {
    const t = Math.max(0, Math.min(1, percent / 100));

    return (
        <div className={styles.loadingContainer}>
            {/* 위로 이동 후 화면 밖: top0, top1, left0 */}
            <img
                src={cloudTop}
                alt="top cloud 1"
                className={`${styles.cloud} ${styles.cloudTop} ${styles.top0} ${styles.raiseUpToOut}`}
                style={{
                    '--t': t,
                    '--dur': '1.2s', // 지속시간(더 빠르게: 작게, 더 느리게: 크게)
                    '--ease': 'cubic-bezier(0.35,0.25,0.45,1)',
                    '--rise': '260px', // 0~95% 상승 거리
                    '--extraRise': '340px', // 95~100% 추가 상승(화면 밖)
                }}
            />
            <img
                src={cloudTop}
                alt="top cloud 2"
                className={`${styles.cloud} ${styles.cloudTop} ${styles.top1} ${styles.raiseUpToOut}`}
                style={{
                    '--t': t, // 진행률(0~1) - 건들지 않음
                    '--dur': '1.0s', // 지속시간(속도) ← 여기 수정
                    '--ease': 'cubic-bezier(0.35,0.25,0.40,1)', // 보간(가감속) ← 여기 수정
                    '--rise': '460px', // 0~95% 상향 이동량 ← 여기 수정
                    '--extraRise': '240px', // 95~100% 추가 상승(화면 밖) ← 여기 수정
                }}
            />
            <img
                src={cloudLeft}
                alt="left cloud 1"
                className={`${styles.cloud} ${styles.cloudLeft} ${styles.left0} ${styles.raiseUpToOut}`}
                style={{
                    '--t': t,
                    '--dur': '0.4s',
                    '--ease': 'cubic-bezier(0.25,0.55,0.20,1)',
                    '--rise': '280px',
                    '--extraRise': '220px',
                }}
            />

            {/* 아래로 이동: bottom1, bottom2, right1 */}
            <img
                src={cloudBottom}
                alt="bottom cloud 1"
                className={`${styles.cloud} ${styles.cloudBottom} ${styles.bottom1} ${styles.lowerToHalf}`}
                style={{
                    '--t': t,
                    '--dur': '1.1s',
                    '--ease': 'cubic-bezier(0.45,0,0.55,1)',
                    '--downRatio': '0.5', // 0.5=50vh, 0.4=40vh 등으로 거리 조절
                }}
            />
            <img
                src={cloudBottom}
                alt="bottom cloud 2"
                className={`${styles.cloud} ${styles.cloudBottom} ${styles.bottom2} ${styles.lowerToHalf}`}
                style={{
                    '--t': t,
                    '--dur': '1.3s',
                    '--ease': 'cubic-bezier(0.5,0,0.2,1)',
                    '--downRatio': '0.42',
                }}
            />
            <img
                src={cloudRight}
                alt="right cloud 1"
                className={`${styles.cloud} ${styles.cloudRight} ${styles.right1} ${styles.lowerToHalf}`}
                style={{
                    '--t': t,
                    '--dur': '1.6s',
                    '--ease': 'cubic-bezier(0.35,0,0.65,1)',
                    '--downRatio': '0.55',
                }}
            />

            <div className={styles.box} />

            <div className={styles.centerContent}>
                <div className={styles.headlineRow}>
                    <h1>Mea mappa caelestis</h1>
                    <p>SINCE 2025</p>
                </div>
                <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                    </div>
                    <div className={styles.percentText}>{percent}%</div>
                </div>
            </div>
        </div>
    );
}

export default Loading;
