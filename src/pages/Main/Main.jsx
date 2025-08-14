import React, { useRef, useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import Loading from '../../components/ui/Loading/Loading';
import styles from './Main.module.css';

import { Canvas, useFrame } from '@react-three/fiber';
import { DoubleSide, Color, Texture, LinearFilter } from 'three';

// 섹션 데이터: 텍스트만 사용
const SECTIONS = [
    { id: 1, label: 'SECTION 1', title: 'SECTION 1', color: '#df0808' },
    { id: 2, label: 'SECTION 2', title: 'SECTION 2', color: '#03457b' },
    { id: 3, label: 'SECTION 3', title: 'SECTION 3', color: '#027458' },
    { id: 4, label: 'SECTION 4', title: 'SECTION 4', color: '#5c8797' },
];

/* 텍스트만 캔버스에 그려 Texture 생성 (이미지 사용 안 함) */
function useTextTexture({
    title,
    textColor = '#ffffff',
    width = 1024,
    height = 256,
    bg = 'transparent',
    fontScale = 0.45, // 높이에 대한 비율
    fontFamily = 'sans-serif',
}) {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // 배경
        if (bg !== 'transparent') {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);
        }

        // 텍스트
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${Math.floor(height * fontScale)}px ${fontFamily}`;
        ctx.fillText(title || '', width * 0.5, height * 0.5);

        const texture = new Texture(canvas);
        texture.needsUpdate = true;
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        return texture;
    }, [title, textColor, width, height, bg, fontScale, fontFamily]);
}

/* 섹션 곡면(본체) + 텍스트 라벨(얇은 곡면 띠) */
function SectionSlice({ radius, height, thetaStart, thetaLength, color, title, visible = true }) {
    // 본체 머티리얼(불투명)
    const materialProps = useMemo(
        () => ({
            color: new Color(color),
            side: DoubleSide,
            transparent: false,
            opacity: 1,
        }),
        [color]
    );

    // 텍스트만으로 만든 라벨 텍스처
    const labelTexture = useTextTexture({
        title: title || '',
        textColor: '#ffffff',
        bg: 'transparent',
    });

    // 라벨 곡면(본체 위 살짝)
    const radiusLabel = radius + 0.02;
    const labelHeight = Math.max(0.3, height * 0.32);

    return (
        <group visible={visible}>
            {/* 섹션 본체 */}
            <mesh>
                <cylinderGeometry args={[radius, radius, height, 64, 1, false, thetaStart, thetaLength]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* 텍스트 라벨(같은 곡률 띠) */}
            <mesh>
                <cylinderGeometry
                    args={[radiusLabel, radiusLabel, labelHeight, 64, 1, true, thetaStart, thetaLength]}
                />
                <meshStandardMaterial
                    map={labelTexture}
                    transparent={true}
                    opacity={1}
                    side={DoubleSide}
                    color={'#ffffff'}
                />
            </mesh>
        </group>
    );
}

/* 그룹 회전 + 뒤쪽 섹션 가리기 */
function CurvedCylinder({ sections, radius = 20, height = 12, wheelSensitivity = 0.003 }) {
    const groupRef = useRef();
    const [rotationY, setRotationY] = useState(0);

    useEffect(() => {
        const onWheel = (e) => setRotationY((r) => r + e.deltaY * wheelSensitivity);
        window.addEventListener('wheel', onWheel, { passive: true });
        return () => window.removeEventListener('wheel', onWheel);
    }, [wheelSensitivity]);

    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y = rotationY;
    });

    const total = sections.length;
    const thetaLen = (2 * Math.PI) / total;

    return (
        <group ref={groupRef}>
            {sections.map((sec, idx) => {
                const thetaStart = idx * thetaLen;
                const thetaMid = thetaStart + thetaLen / 2;
                const worldMid = thetaMid + rotationY;
                // 앞면만 보이게 (임계값으로 경계 깜빡임 완화)
                const facingCamera = Math.cos(worldMid) > 0.12;

                return (
                    <SectionSlice
                        key={sec.id}
                        radius={radius}
                        height={height}
                        thetaStart={thetaStart}
                        thetaLength={thetaLen}
                        color={sec.color}
                        title={sec.title || sec.label}
                        visible={facingCamera}
                    />
                );
            })}
        </group>
    );
}

export default function Main() {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // 인트로 로딩
    useEffect(() => {
        if (!isLoading) return;
        if (percent === 0) {
            const wait = setTimeout(() => setPercent(1), 400);
            return () => clearTimeout(wait);
        }
        if (percent > 0 && percent < 90) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 18);
            return () => clearInterval(interval);
        }
        if (percent >= 90 && percent < 100) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 100)), 70);
            return () => clearInterval(interval);
        }
        if (percent === 100) {
            const timeout = setTimeout(() => setIsLoading(false), 550);
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    if (isLoading) return <Loading percent={percent} />;

    return (
        <div className={styles.mainWrapper}>
            <Header />
            <div className={styles.canvasWrapper}>
                <Canvas camera={{ position: [0, 0, 28], fov: 24 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[8, 10, 6]} intensity={1.0} />
                    {/* 화면 꽉 차게 보이도록 radius/height 조정 */}
                    <CurvedCylinder sections={SECTIONS} radius={13} height={8} wheelSensitivity={0.003} />
                </Canvas>
            </div>
        </div>
    );
}
