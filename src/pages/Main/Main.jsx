import React, { useRef, useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import Loading from '../../components/ui/Loading/Loading';
import styles from './Main.module.css';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// 섹션 데이터
const SECTIONS = [
    { id: 1, label: 'SECTION 1', title: 'SECTION 1', color: '#df0808', imageUrl: '/textures/sec1.png' },
    { id: 2, label: 'SECTION 2', title: 'SECTION 2', color: '#03457b', imageUrl: '/textures/sec2.png' },
    { id: 3, label: 'SECTION 3', title: 'SECTION 3', color: '#027458', imageUrl: '/textures/sec3.png' },
    { id: 4, label: 'SECTION 4', title: 'SECTION 4', color: '#5c8797', imageUrl: '/textures/sec4.png' },
];

// 라벨 텍스처(텍스트만) – 필요 시 유지
function useTextTexture({
    title,
    textColor = '#ffffff',
    width = 2048,
    height = 512,
    bg = 'transparent',
    fontScale = 0.45,
    fontFamily = 'sans-serif',
}) {
    return useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (bg !== 'transparent') {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${Math.floor(height * fontScale)}px ${fontFamily}`;
        ctx.fillText(title || '', width * 0.5, height * 0.5);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        return texture;
    }, [title, textColor, width, height, bg, fontScale, fontFamily]);
}

function SectionSlice({
    id,
    radius,
    height,
    thetaStart,
    thetaLength,
    color,
    title,
    imageUrl,
    visible = true,
    showLabel = true,
}) {
    // 본체 이미지 텍스처
    const baseTexture = useMemo(() => {
        if (!imageUrl) return null;
        const loader = new TextureLoader();
        const tex = loader.load(imageUrl);
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.repeat.set(1, 1);
        tex.offset.set(0, 0);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        return tex;
    }, [imageUrl]);

    const baseMaterial = useMemo(() => {
        if (baseTexture) {
            return new THREE.MeshStandardMaterial({
                map: baseTexture,
                color: new THREE.Color('#ffffff'),
                side: THREE.FrontSide,
                transparent: false,
                opacity: 1,
            });
        }
        return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            side: THREE.FrontSide,
            transparent: false,
            opacity: 1,
        });
    }, [baseTexture, color]);

    const labelTexture = useTextTexture({
        title: title || '',
        textColor: '#ffffff',
    });

    const radiusLabel = radius + 0.02;
    const labelHeight = Math.max(0.3, height * 0.28);

    return (
        <group visible={visible}>
            <mesh>
                <cylinderGeometry args={[radius, radius, height, 96, 1, false, thetaStart, thetaLength]} />
                <primitive object={baseMaterial} attach="material" />
            </mesh>

            {showLabel && labelTexture && (
                <mesh>
                    <cylinderGeometry
                        args={[radiusLabel, radiusLabel, labelHeight, 96, 1, true, thetaStart, thetaLength]}
                    />
                    <meshStandardMaterial
                        map={labelTexture}
                        color={'#ffffff'}
                        side={THREE.DoubleSide}
                        transparent={true}
                        depthWrite={true}
                        opacity={1}
                    />
                </mesh>
            )}
        </group>
    );
}

function CurvedCylinder({
    sections,
    radius = 20,
    height = 12,
    wheelSensitivity = 0.003,
    scrollMode, // 'horizontal' | 'vertical'
    setScrollMode, // setter
    onEnterVertical, // 수직 전환 콜백
    startAtHalfBetween14 = true,
}) {
    const groupRef = useRef();

    // 회전 상태
    const [rotationY, _setRotationY] = useState(0);
    const rotationYRef = useRef(0);
    const setRotationY = (v) => {
        rotationYRef.current = v;
        _setRotationY(v);
    };

    // 시작 각도 저장(랩 어라운드 판단 기준)
    const startAngleRef = useRef(0);
    // 총 회전한 “정규화 회전수” 추적(방향 무관 절대 회전수)
    const revolutionsRef = useRef(0);
    const lastAngleRef = useRef(0);

    // 시작 각도를 섹션4-1 중간으로 설정
    useEffect(() => {
        if (!startAtHalfBetween14) return;
        const total = sections.length;
        const thetaLen = (2 * Math.PI) / total;

        const thetaMid4 = 3 * thetaLen + thetaLen / 2;
        const thetaMid1 = 0 * thetaLen + thetaLen / 2;

        let delta = thetaMid1 - thetaMid4;
        delta = Math.atan2(Math.sin(delta), Math.cos(delta));
        const halfBetween = thetaMid4 + delta / 2;

        setRotationY(halfBetween);
        startAngleRef.current = halfBetween;
        lastAngleRef.current = halfBetween;
        revolutionsRef.current = 0;
    }, [sections.length, startAtHalfBetween14]);

    // 수평 모드에서만 휠 가로채기 + 회전/전환 로직
    useEffect(() => {
        if (scrollMode !== 'horizontal') return;

        // 페이지 수직 스크롤 방지: 수평 모드에서는 wheel을 소비한다
        const onWheel = (e) => {
            e.preventDefault(); // 문서 스크롤 방지 (핵심 1)
            const delta = e.deltaY * wheelSensitivity;
            const prev = rotationYRef.current;
            let next = prev + delta;

            // 각도 정규화(-π~π) 대신, 연속적으로 이어가되 비교 시 모듈러 사용
            setRotationY(next);

            // 회전수(rev) 추적: 이전각과 현재각의 차이를 -π~π로 정규화해 누적
            let d = next - lastAngleRef.current;
            // -π~π로 정규화
            d = Math.atan2(Math.sin(d), Math.cos(d));
            lastAngleRef.current = lastAngleRef.current + d; // 연속각 업데이트
            // 절대 회전수 누적
            revolutionsRef.current += Math.abs(d) / (2 * Math.PI);

            // “시작점으로 돌아옴” 판단:
            // - 최소 1바퀴 이상 돌아야 함
            // - 현재각과 시작각의 차이를 2π 모듈러로 0 근처인지 확인
            const angleNow = rotationYRef.current;
            const startAngle = startAngleRef.current;

            let diff = angleNow - startAngle;
            // -π~π로 정규화
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            const closeToStart = Math.abs(diff) < 0.05; // 임계값(라디안) 조정 가능

            if (revolutionsRef.current >= 1.0 && closeToStart) {
                setScrollMode('vertical'); // 수직 모드로 전환
                onEnterVertical?.();
            }
        };

        // passive:false로 등록해야 preventDefault 가능
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, [scrollMode, wheelSensitivity, setScrollMode, onEnterVertical]);

    // 그룹 회전 적용
    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y = rotationYRef.current;
    });

    // 섹션 가시성
    const total = sections.length;
    const thetaLen = (2 * Math.PI) / total;

    return (
        <group ref={groupRef}>
            {sections.map((sec, idx) => {
                const thetaStart = idx * thetaLen;
                const thetaMid = thetaStart + thetaLen / 2;
                const worldMid = thetaMid + rotationYRef.current;
                const facingCamera = Math.cos(worldMid) > 0.12;

                return (
                    <SectionSlice
                        key={sec.id}
                        id={sec.id}
                        radius={radius}
                        height={height}
                        thetaStart={thetaStart}
                        thetaLength={thetaLen}
                        color={sec.color}
                        title={sec.title || sec.label}
                        imageUrl={sec.imageUrl || ''}
                        visible={facingCamera}
                        showLabel={true}
                    />
                );
            })}
        </group>
    );
}

export default function Main() {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // 스크롤 모드: 수평 → 수직
    const [scrollMode, setScrollMode] = useState('horizontal');

    // 로딩 시간 제어 로직 해설 + 원하는 시간으로 바꾸는 방법 예시
    // - 아래 코드는 percent(0→100)로 진행률을 올리면서 인트로 표시 시간을 "구간별"로 조절합니다.
    // - 각 구간의 setTimeout / setInterval 지연(ms)을 변경하면 전체 로딩 체감 시간이 바뀝니다.

    useEffect(() => {
        // isLoading이 false면 아무 것도 하지 않음
        if (!isLoading) return;

        // 1) 시작 지연: percent가 0일 때 400ms 대기 후 1%로 이동
        //    -> 첫 진입 연출(페이드인 느낌). 더 빠르게 하려면 400을 줄이세요.
        if (percent === 0) {
            const wait = setTimeout(() => setPercent(1), 900);
            return () => clearTimeout(wait);
        }

        // 2) 본 진행(0~90%): 18ms마다 +1% (즉, 1% 증가에 18ms)
        //    -> 1% 당 시간 = 18ms, 총 89%를 올리므로 대략 18ms * 89 ≈ 1.6초
        //    -> 더 천천히: 18을 크게, 더 빠르게: 18을 작게
        if (percent > 0 && percent < 55) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 120);
            return () => clearInterval(interval);
        }

        if (percent >= 55 && percent < 85) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 90);
            return () => clearInterval(interval);
        }

        // 3) 마무리(90~100%): 70ms마다 +1% (즉, 1% 증가에 70ms)
        //    -> 마지막 10%에 약 700ms로 '여운'을 줌
        //    -> 더 빨리 끝내려면 70을 줄이고, 더 느린 피니시를 원하면 70을 키우세요.
        if (percent >= 85 && percent < 100) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 100)), 170);
            return () => clearInterval(interval);
        }

        // 4) 완료 후 유지 시간: 100% 도달 후 550ms 뒤 isLoading=false로 전환
        //    -> 완료 화면이 잠깐 머물게 하는 연출
        //    -> 즉시 닫히게 하려면 550을 줄이거나 0으로
        if (percent === 100) {
            const timeout = setTimeout(() => setIsLoading(false), 550);
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    // 로딩 표시
    if (isLoading) return <Loading percent={percent} />;

    // 수직 모드 진입 시: 아래로 스무스 스크롤(필요에 맞게 수정)
    const handleEnterVertical = () => {
        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight, // 1뷰포트 아래로
                behavior: 'smooth',
            });
        }, 50);
    };

    // 수평 단계에서는 페이지 스크롤을 막고, 수직으로 바뀐 뒤에는 기본 스크롤 허용
    // body/css 쪽에서 overflow-y는 기본으로 두면 됨

    return (
        <div className={styles.mainWrapper}>
            <Header />
            <div className={styles.canvasWrapper}>
                <Canvas camera={{ position: [0, 0, 28], fov: 24 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[8, 10, 6]} intensity={1.0} />
                    <CurvedCylinder
                        sections={SECTIONS}
                        radius={12}
                        height={8.5}
                        wheelSensitivity={0.003}
                        scrollMode={scrollMode}
                        setScrollMode={setScrollMode}
                        onEnterVertical={handleEnterVertical}
                        startAtHalfBetween14={true}
                    />
                </Canvas>
            </div>

            {/* 아래 실제 콘텐츠(데모용) */}
            <div style={{ width: '100%', height: '100vh', background: '#0b1220' }} />
            <div style={{ width: '100%', height: '100vh', background: '#101826' }} />
        </div>
    );
}
