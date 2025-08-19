import React, { useState } from 'react';
import styles from './Sky.module.css';

// --- ✨ 해결: 원본 데이터 배열을 먼저 선언 ---
const ZODIAC_CONSTELLATIONS = [
    { id: 'capricornus', name: 'Capricornus (염소자리)', info: '1월의 별자리. 역삼각형 모양이 특징입니다.' },
    { id: 'aquarius', name: 'Aquarius (물병자리)', info: '2월의 별자리. 지그재그 모양의 물줄기를 그립니다.' },
    { id: 'pisces', name: 'Pisces (물고기자리)', info: '3월의 별자리. 두 마리 물고기가 리본으로 묶여있습니다.' },
    { id: 'aries', name: 'Aries (양자리)', info: '4월의 별자리. 황도 12궁의 첫 번째 별자리입니다.' },
    { id: 'taurus', name: 'Taurus (황소자리)', info: '5월의 별자리. 밝은 알데바란을 포함하고 있습니다.' },
    { id: 'gemini', name: 'Gemini (쌍둥이자리)', info: '6월의 별자리. 카스토르와 폴룩스 형제가 빛납니다.' },
    { id: 'cancer', name: 'Cancer (게자리)', info: '7월의 별자리. 어두운 별들로 이루어져 있습니다.' },
    { id: 'leo', name: 'Leo (사자자리)', info: '8월의 별자리. 하늘의 왕으로 불립니다.' },
    { id: 'virgo', name: 'Virgo (처녀자리)', info: '9월의 별자리. 정의의 여신 아스트라이아의 모습입니다.' },
    { id: 'libra', name: 'Libra (천칭자리)', info: '10월의 별자리. 유일하게 무생물인 별자리입니다.' },
    { id: 'scorpius', name: 'Scorpius (전갈자리)', info: '11월의 별자리. 붉은 심장 안타레스가 빛납니다.' },
    { id: 'sagittarius', name: 'Sagittarius (궁수자리)', info: '12월의 별자리. 주전자 모양으로도 알려져 있습니다.' },
];

// --- ✨ 해결: 원본 배열을 .map()으로 가공하여 최종 데이터 생성 ---
const CONSTELLATIONS_DATA = ZODIAC_CONSTELLATIONS.map((constellation, index) => {
    const totalDuration = 360;
    // ✨ 해결: 이제 ZODIAC_CONSTELLATIONS.length를 사용하므로 오류가 발생하지 않습니다.
    const spacing = totalDuration / ZODIAC_CONSTELLATIONS.length;

    return {
        ...constellation,
        startTop: `${15 + Math.random() * 60}%`,
        moveDuration: totalDuration,
        delay: index * -spacing,
        stars: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => ({
            left: Math.random() * 10 - 5,
            top: Math.random() * 10 - 5,
            size: Math.random() * 1 + 1.5,
            twinkleDelay: `${(Math.random() * 3).toFixed(1)}s`,
        })),
    };
});

// (이하 컴포넌트 코드는 동일)
export default function Sky() {
    const [hoveredConst, setHoveredConst] = useState(null);

    const handleConstellationClick = (constellation) => {
        alert(`[${constellation.name}]\n\n${constellation.info}`);
    };

    return (
        <div className={styles.sky}>
            <div className={styles.gradient} />
            <div className={styles.constellationsLayer}>
                {CONSTELLATIONS_DATA.map((group) => (
                    <div
                        key={group.id}
                        className={styles.constellation}
                        style={{
                            top: group.startTop,
                            '--const-move-duration': `${group.moveDuration}s`,
                            '--const-move-delay': `${group.delay}s`,
                        }}
                        onMouseEnter={() => setHoveredConst(group)}
                        onMouseLeave={() => setHoveredConst(null)}
                        onClick={() => handleConstellationClick(group)}
                    >
                        {group.stars.map((s, idx) => (
                            <div
                                key={`${group.id}-${idx}`}
                                className={styles.star}
                                style={{
                                    left: `${s.left}vw`,
                                    top: `${s.top}vh`,
                                    width: `${s.size}px`,
                                    height: `${s.size}px`,
                                    animationDelay: s.twinkleDelay,
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {hoveredConst && (
                <div
                    className={styles.tooltip}
                    style={{
                        left: `calc(${hoveredConst.startLeft || '50%'} + 20px)`,
                        top: `calc(${hoveredConst.startTop} - 20px)`,
                        transform: 'translateY(-100%)',
                    }}
                >
                    <strong>{hoveredConst.name}</strong>
                </div>
            )}
            

           {/* 구름 레이어 (기존과 동일) */}
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
