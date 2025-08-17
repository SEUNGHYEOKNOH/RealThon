// src/components/Sky/Sky.jsx
import React, { useState } from 'react';
import styles from './Sky.module.css';

const CONSTELLATIONS = [
    {
        id: 'ursa-major',
        name: 'Ursa Major',
        info: '북두칠성으로 알려진 큰곰자리의 일부.',
        // 그룹 기준 좌표(화면 비율). 그룹 전체를 이 위치에서 시작시킴.
        startLeft: '55%',
        startTop: '22%',
        // 그룹 이동 속도(초), 지연(초)
        moveDuration: 120,
        delay: 0,
        // 그룹 내부 별 상대 좌표(그룹의 0,0은 그룹 중앙)
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
        moveDuration: 140,
        delay: 10,
        stars: [
            { left: -8, top: -6, size: 2.2, twinkleDelay: '0.2s', drift: 6 },
            { left: -4, top: -2, size: 2.0, twinkleDelay: '0.6s', drift: 6 },
            { left: 0, top: 0, size: 2.4, twinkleDelay: '1.0s', drift: 7 },
            { left: 4, top: -3, size: 2.0, twinkleDelay: '1.2s', drift: 6 },
            { left: 8, top: -1, size: 2.0, twinkleDelay: '1.6s', drift: 6 },
        ],
    },
];

export default function Sky() {
    const [hovered, setHovered] = useState(null); // 별 개별 툴팁에 사용
    const [hoveredConst, setHoveredConst] = useState(null); // 별자리 그룹 툴팁

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
                            // 그룹 이동 속도/지연 커스터마이즈
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

            {/* 별자리 그룹 툴팁 */}
            {hoveredConst && (
                <div
                    className={`${styles.tooltip} ${styles.constTooltip}`}
                    style={{ left: hoveredConst.startLeft, top: hoveredConst.startTop }}
                >
                    <strong>{hoveredConst.name}</strong>
                    <div>{hoveredConst.info}</div>
                </div>
            )}

            {/* 구름 레이어 */}
            <div className={`${styles.cloud} ${styles.cloudFar}`} />
            <div className={`${styles.cloud} ${styles.cloudMid}`} />
            <div className={`${styles.cloud} ${styles.cloudNear}`} />
        </div>
    );
}
