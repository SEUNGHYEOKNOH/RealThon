import React, { useState } from 'react';
import styles from './Sky.module.css';

// --- ✨ 별자리 데이터 28개로 확장 ---
// 황도 12궁 (12개) + 계절별 대표 별자리 (16개)
const CONSTELLATIONS = [
    // 황도 12궁
    {
        id: 'aries',
        name: 'Aries',
        info: '황도 12궁의 첫 번째, 양자리.',
        startLeft: '10%',
        startTop: '15%',
        moveDuration: 220,
        delay: 5,
        stars: [
            { left: 0, top: 0, size: 2.5 },
            { left: 2, top: 2, size: 2.1 },
            { left: 5, top: 1, size: 2.3 },
        ],
    },
    {
        id: 'taurus',
        name: 'Taurus',
        info: '알데바란을 포함하는 황소자리.',
        startLeft: '25%',
        startTop: '80%',
        moveDuration: 280,
        delay: 40,
        stars: [
            { left: 0, top: 0, size: 3 },
            { left: -4, top: 5, size: 2.2 },
            { left: 5, top: 6, size: 2.4 },
            { left: 9, top: 2, size: 2.3 },
        ],
    },
    {
        id: 'gemini',
        name: 'Gemini',
        info: '카스토르와 폴룩스가 빛나는 쌍둥이자리.',
        startLeft: '90%',
        startTop: '20%',
        moveDuration: 250,
        delay: 120,
        stars: [
            { left: 0, top: 0, size: 2.8 },
            { left: 2, top: 8, size: 2.8 },
            { left: -3, top: -5, size: 2.1 },
            { left: 5, top: 13, size: 2.1 },
        ],
    },
    {
        id: 'cancer',
        name: 'Cancer',
        info: '어두운 별들로 이루어진 게자리.',
        startLeft: '85%',
        startTop: '60%',
        moveDuration: 300,
        delay: 10,
        stars: [
            { left: 0, top: 0, size: 1.8 },
            { left: 2, top: 3, size: 1.9 },
            { left: -2, top: 4, size: 1.7 },
            { left: 5, top: 5, size: 1.8 },
        ],
    },
    {
        id: 'leo',
        name: 'Leo',
        info: '하늘의 왕, 사자자리.',
        startLeft: '5%',
        startTop: '55%',
        moveDuration: 260,
        delay: 80,
        stars: [
            { left: 0, top: 0, size: 2.9 },
            { left: 5, top: 2, size: 2.2 },
            { left: 10, top: 0, size: 2.4 },
            { left: 12, top: -5, size: 2.1 },
            { left: -3, top: 1, size: 2.0 },
        ],
    },
    {
        id: 'virgo',
        name: 'Virgo',
        info: '스피카를 품은 처녀자리.',
        startLeft: '70%',
        startTop: '10%',
        moveDuration: 290,
        delay: 150,
        stars: [
            { left: 0, top: 0, size: 2.8 },
            { left: -5, top: 5, size: 2.1 },
            { left: 3, top: 8, size: 2.2 },
            { left: 8, top: 2, size: 2.0 },
        ],
    },
    {
        id: 'libra',
        name: 'Libra',
        info: '유일하게 무생물인 천칭자리.',
        startLeft: '30%',
        startTop: '30%',
        moveDuration: 310,
        delay: 20,
        stars: [
            { left: 0, top: 0, size: 2.2 },
            { left: 5, top: 5, size: 2.2 },
            { left: -5, top: 5, size: 2.0 },
            { left: 0, top: 10, size: 2.1 },
        ],
    },
    {
        id: 'scorpius',
        name: 'Scorpius',
        info: '붉은 심장 안타레스를 가진 전갈자리.',
        startLeft: '50%',
        startTop: '85%',
        moveDuration: 270,
        delay: 90,
        stars: [
            { left: 0, top: 0, size: 3.1 },
            { left: 3, top: -4, size: 2.3 },
            { left: 6, top: -7, size: 2.2 },
            { left: -2, top: 5, size: 2.4 },
            { left: -4, top: 9, size: 2.3 },
        ],
    },
    {
        id: 'sagittarius',
        name: 'Sagittarius',
        info: '주전자 모양의 궁수자리.',
        startLeft: '15%',
        startTop: '40%',
        moveDuration: 240,
        delay: 130,
        stars: [
            { left: 0, top: 0, size: 2.4 },
            { left: 4, top: 2, size: 2.2 },
            { left: 6, top: -3, size: 2.3 },
            { left: 9, top: -1, size: 2.1 },
            { left: -3, top: 4, size: 2.0 },
        ],
    },
    {
        id: 'capricornus',
        name: 'Capricornus',
        info: '역삼각형 모양의 염소자리.',
        startLeft: '80%',
        startTop: '45%',
        moveDuration: 290,
        delay: 60,
        stars: [
            { left: 0, top: 0, size: 2.2 },
            { left: 5, top: -3, size: 2.1 },
            { left: 8, top: 2, size: 2.0 },
            { left: -4, top: 5, size: 2.2 },
        ],
    },
    {
        id: 'aquarius',
        name: 'Aquarius',
        info: '지그재그 모양의 물병자리.',
        startLeft: '40%',
        startTop: '5%',
        moveDuration: 260,
        delay: 110,
        stars: [
            { left: 0, top: 0, size: 2.0 },
            { left: 3, top: 3, size: 2.1 },
            { left: 6, top: 0, size: 1.9 },
            { left: 9, top: 3, size: 2.0 },
        ],
    },
    {
        id: 'pisces',
        name: 'Pisces',
        info: '두 마리 물고기가 묶여있는 물고기자리.',
        startLeft: '65%',
        startTop: '70%',
        moveDuration: 320,
        delay: 30,
        stars: [
            { left: 0, top: 0, size: 2.0 },
            { left: 5, top: 5, size: 1.9 },
            { left: 10, top: 2, size: 1.8 },
            { left: -4, top: 8, size: 1.9 },
        ],
    },

    // 계절별 대표 별자리
    // 봄
    {
        id: 'bootes',
        name: 'Bootes',
        info: '봄의 길잡이, 목동자리.',
        startLeft: '5%',
        startTop: '25%',
        moveDuration: 230,
        delay: 15,
        stars: [
            { left: 0, top: 0, size: 2.9 },
            { left: -3, top: 5, size: 2.2 },
            { left: 3, top: 5, size: 2.2 },
            { left: 0, top: 12, size: 2.4 },
        ],
    },
    {
        id: 'coma-berenices',
        name: 'Coma Berenices',
        info: '아름다운 머리카락, 베레니케의 머리털자리.',
        startLeft: '75%',
        startTop: '35%',
        moveDuration: 330,
        delay: 95,
        stars: [
            { left: 0, top: 0, size: 1.8 },
            { left: 2, top: 2, size: 1.7 },
            { left: -1, top: 4, size: 1.9 },
            { left: 4, top: 5, size: 1.6 },
        ],
    },
    // 여름
    {
        id: 'lyra',
        name: 'Lyra',
        info: '직녀성 베가를 품은 거문고자리.',
        startLeft: '95%',
        startTop: '50%',
        moveDuration: 210,
        delay: 25,
        stars: [
            { left: 0, top: 0, size: 3.2 },
            { left: 2, top: 4, size: 2.2 },
            { left: -2, top: 4, size: 2.2 },
        ],
    },
    {
        id: 'cygnus',
        name: 'Cygnus',
        info: '은하수 위의 백조자리(북십자성).',
        startLeft: '55%',
        startTop: '10%',
        moveDuration: 280,
        delay: 140,
        stars: [
            { left: 0, top: 0, size: 2.9 },
            { left: 0, top: 10, size: 2.5 },
            { left: -4, top: 5, size: 2.3 },
            { left: 4, top: 5, size: 2.3 },
            { left: 0, top: -5, size: 2.4 },
        ],
    },
    {
        id: 'aquila',
        name: 'Aquila',
        info: '견우성 알타이르를 가진 독수리자리.',
        startLeft: '20%',
        startTop: '65%',
        moveDuration: 240,
        delay: 70,
        stars: [
            { left: 0, top: 0, size: 3.0 },
            { left: -3, top: -2, size: 2.4 },
            { left: 3, top: -2, size: 2.4 },
        ],
    },
    // 가을
    {
        id: 'pegasus',
        name: 'Pegasus',
        info: '가을 하늘의 사각형, 페가수스자리.',
        startLeft: '35%',
        startTop: '90%',
        moveDuration: 290,
        delay: 50,
        stars: [
            { left: 0, top: 0, size: 2.6 },
            { left: 10, top: 0, size: 2.5 },
            { left: 0, top: 10, size: 2.4 },
            { left: 10, top: 10, size: 2.5 },
        ],
    },
    {
        id: 'andromeda',
        name: 'Andromeda',
        info: '안드로메다 은하를 품은 안드로메다자리.',
        startLeft: '80%',
        startTop: '5%',
        moveDuration: 310,
        delay: 160,
        stars: [
            { left: 0, top: 0, size: 2.5 },
            { left: 5, top: 3, size: 2.2 },
            { left: 10, top: 5, size: 2.3 },
            { left: 15, top: 6, size: 2.1 },
        ],
    },
    {
        id: 'perseus',
        name: 'Perseus',
        info: '영웅 페르세우스자리.',
        startLeft: '15%',
        startTop: '95%',
        moveDuration: 220,
        delay: 85,
        stars: [
            { left: 0, top: 0, size: 2.6 },
            { left: 3, top: 5, size: 2.4 },
            { left: -2, top: 10, size: 2.5 },
            { left: 5, top: 15, size: 2.3 },
        ],
    },
    // 겨울
    {
        id: 'orion',
        name: 'Orion',
        info: '겨울 하늘의 제왕, 오리온자리.',
        startLeft: '45%',
        startTop: '45%',
        moveDuration: 200,
        delay: 0,
        stars: [
            { left: -5, top: -8, size: 2.9 },
            { left: 5, top: -8, size: 2.7 },
            { left: -5, top: 8, size: 3.1 },
            { left: 5, top: 8, size: 2.8 },
            { left: 0, top: 0, size: 2.5 },
            { left: 0, top: -2, size: 2.5 },
            { left: 0, top: 2, size: 2.5 },
        ],
    },
    {
        id: 'canis-major',
        name: 'Canis Major',
        info: '시리우스를 품은 큰개자리.',
        startLeft: '60%',
        startTop: '90%',
        moveDuration: 230,
        delay: 100,
        stars: [
            { left: 0, top: 0, size: 3.5 },
            { left: 5, top: 5, size: 2.3 },
            { left: -3, top: 8, size: 2.2 },
        ],
    },
    {
        id: 'auriga',
        name: 'Auriga',
        info: '카펠라가 빛나는 마차부자리.',
        startLeft: '5%',
        startTop: '5%',
        moveDuration: 270,
        delay: 180,
        stars: [
            { left: 0, top: 0, size: 3.0 },
            { left: 8, top: 2, size: 2.3 },
            { left: 5, top: 10, size: 2.4 },
            { left: -5, top: 10, size: 2.2 },
            { left: -8, top: 2, size: 2.3 },
        ],
    },

    // 기존 별자리 데이터 유지 (또는 다른 것으로 교체 가능)
    {
        id: 'ursa-major',
        name: 'Ursa Major',
        info: '북두칠성으로 알려진 큰곰자리의 일부.',
        startLeft: '55%',
        startTop: '22%',
        moveDuration: 250,
        delay: 40,
        stars: [
            { left: -6, top: -4, size: 2.6 },
            { left: -3, top: -1, size: 2.2 },
            { left: 0, top: 1, size: 2.0 },
            { left: 4, top: -2, size: 2.4 },
            { left: 7, top: 0, size: 2.0 },
            { left: 10, top: 3, size: 1.9 },
            { left: 13, top: 5, size: 1.8 },
        ],
    },
    {
        id: 'cassiopeia',
        name: 'Cassiopeia',
        info: 'W자 모양으로 유명한 카시오페이아자리.',
        startLeft: '18%',
        startTop: '32%',
        moveDuration: 250,
        delay: 110,
        stars: [
            { left: -8, top: -6, size: 2.2 },
            { left: -4, top: -2, size: 2.0 },
            { left: 0, top: 0, size: 2.4 },
            { left: 4, top: -3, size: 2.0 },
            { left: 8, top: -1, size: 2.0 },
        ],
    },
    {
        id: 'draco',
        name: 'Draco',
        info: '하늘의 북극을 휘감는 용자리.',
        startLeft: '90%',
        startTop: '75%',
        moveDuration: 340,
        delay: 200,
        stars: [
            { left: 0, top: 0, size: 2.3 },
            { left: 5, top: 2, size: 2.1 },
            { left: 10, top: -1, size: 2.2 },
            { left: 15, top: 5, size: 2.0 },
            { left: 18, top: 10, size: 2.1 },
        ],
    },
    {
        id: 'hercules',
        name: 'Hercules',
        info: '하늘의 영웅, 헤라클레스자리.',
        startLeft: '5%',
        startTop: '70%',
        moveDuration: 300,
        delay: 70,
        stars: [
            { left: 0, top: 0, size: 2.4 },
            { left: 5, top: 5, size: 2.2 },
            { left: -5, top: 5, size: 2.2 },
            { left: 0, top: 10, size: 2.3 },
            { left: 5, top: 15, size: 2.1 },
            { left: -5, top: 15, size: 2.1 },
        ],
    },
    {
        id: 'ophiuchus',
        name: 'Ophiuchus',
        info: '황도 위에 자리한 뱀주인자리.',
        startLeft: '40%',
        startTop: '60%',
        moveDuration: 280,
        delay: 140,
        stars: [
            { left: 0, top: 0, size: 2.5 },
            { left: 4, top: -5, size: 2.2 },
            { left: -4, top: -5, size: 2.2 },
            { left: 0, top: 10, size: 2.4 },
        ],
    },
].map((constellation) => ({
    ...constellation,
    // 각 별에 고유한 애니메이션 지연과 표류 효과를 추가합니다.
    stars: constellation.stars.map((star) => ({
        ...star,
        twinkleDelay: `${(Math.random() * 2).toFixed(1)}s`,
        drift: Math.floor(Math.random() * 5) + 3, // 3~8px 사이의 표류
    })),
}));

export default function Sky() {
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
                                        // 툴팁 위치를 동적으로 계산합니다.
                                        left: e.clientX,
                                        top: e.clientY,
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
                <div
                    className={styles.tooltip}
                    style={{ left: hovered.left, top: hovered.top, transform: 'translate(10px, -30px)' }}
                >
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

            {/* 구름 레이어 */}
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
