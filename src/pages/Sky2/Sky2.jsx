import React, { useState } from 'react';
import styles from './Sky2.module.css';

// 별자리 데이터(두 그룹, 동일 속도 이동)
const CONSTELLATIONS = [
    {
        id: 'ursa-major',
        name: 'Ursa Major',
        info: '북두칠성으로 알려진 큰곰자리의 일부.',
        startLeft: '55%',
        startTop: '22%',
        moveDuration: 120, // ← 두 그룹 동일 속도
        delay: 0,
        stars: [
            { left: -6, top: -4, size: 2.6, twinkleDelay: '0s', drift: 6 },
            { left: -3, top: -1, size: 2.2, twinkleDelay: '0.3s', drift: 5 },
            { left: 0, top: 1, size: 2.0, twinkleDelay: '0.6s', drift: 7 },
            { left: 4, top: -2, size: 2.4, twinkleDelay: '0.9s', drift: 6 },
            { left: 7, top: 0, size: 2.0, twinkleDelay: '1.2s', drift: 5 },
            { left: 10, top: 3, size: 1.9, twinkleDelay: '1.5s', drift: 6 },
            { left: 13, top: 5, size: 1.8, twinkleDelay: '1.8s', drift: 6 },
        ],
    },
    {
        id: 'cassiopeia',
        name: 'Cassiopeia',
        info: 'W자 모양으로 유명한 카시오페이아자리.',
        startLeft: '18%',
        startTop: '32%',
        moveDuration: 120, // ← 동일 속도
        delay: 0,
        stars: [
            { left: -8, top: -6, size: 2.2, twinkleDelay: '0.2s', drift: 6 },
            { left: -4, top: -2, size: 2.0, twinkleDelay: '0.6s', drift: 6 },
            { left: 0, top: 0, size: 2.4, twinkleDelay: '1.0s', drift: 7 },
            { left: 4, top: -3, size: 2.0, twinkleDelay: '1.2s', drift: 6 },
            { left: 8, top: -1, size: 2.0, twinkleDelay: '1.6s', drift: 6 },
        ],
    },
];

export default function Sky2() {
    const [hovered, setHovered] = useState(null);
    const [hoveredConst, setHoveredConst] = useState(null);

    return (
        <div className={styles.sky}>
            <div className={styles.gradient} />

            {/* 별자리 그룹 */}
            <div className={styles.constellationsLayer}>
                {CONSTELLATIONS.map((group) => (
                    <div
                        key={group.id}
                        className={styles.constellation}
                        style={{
                            left: group.startLeft,
                            top: group.startTop,
                            '--const-move-duration': `${group.moveDuration}s`,
                            '--const-move-delay': `${group.delay}s`,
                        }}
                        onMouseEnter={() => setHoveredConst(group)}
                        onMouseLeave={() => setHoveredConst(null)}
                    >
                        {group.stars.map((s, idx) => (
                            <div
                                key={`${group.id}-${idx}`}
                                className={styles.star}
                                style={{
                                    left: `calc(50% + ${s.left}vw)`,
                                    top: `calc(50% + ${s.top}vh)`,
                                    width: `${s.size * 2}px`,
                                    height: `${s.size * 2}px`,
                                    animationDelay: s.twinkleDelay,
                                    '--drift-amplitude': `${s.drift}px`,
                                    '--drift-duration': `${8 + s.drift}s`,
                                }}
                                onMouseEnter={(e) =>
                                    setHovered({
                                        name: `★ ${group.name}`,
                                        left: e.currentTarget.style.left,
                                        top: e.currentTarget.style.top,
                                    })
                                }
                                onMouseLeave={() => setHovered(null)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* 개별 별 툴팁 */}
            {hovered && (
                <div className={styles.tooltip} style={{ left: hovered.left, top: hovered.top }}>
                    {hovered.name}
                </div>
            )}

            {/* 별자리 툴팁 */}
            {hoveredConst && (
                <div
                    className={`${styles.tooltip} ${styles.constTooltip}`}
                    style={{ left: hoveredConst.startLeft, top: hoveredConst.startTop }}
                >
                    <strong>{hoveredConst.name}</strong>
                    <div>{hoveredConst.info}</div>
                </div>
            )}

            {/* 구름 8개 (공통 + 개별 클래스 동시 적용) */}
            <div className={`${styles.cloud} ${styles.cloud1}`} />
            <div className={`${styles.cloud} ${styles.cloud2}`} />
            <div className={`${styles.cloud} ${styles.cloud3}`} />
            <div className={`${styles.cloud} ${styles.cloud4}`} />
            <div className={`${styles.cloud} ${styles.cloud5}`} />
            <div className={`${styles.cloud} ${styles.cloud6}`} />
            <div className={`${styles.cloud} ${styles.cloud7}`} />
            <div className={`${styles.cloud} ${styles.cloud8}`} />
        </div>
    );
}
