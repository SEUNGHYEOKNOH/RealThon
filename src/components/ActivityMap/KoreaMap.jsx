import React, { useRef, useState, useEffect } from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';

import KoreaMapImg from '@/assets/KoreaMapImg.png';

export default function KoreaMap({ setLat, setLon, lat, lon }) {
    const mapRef = useRef(null);

    const [markerVisible, setMarkerVisible] = useState(false);
    const [markerX, setMarkerX] = useState(0);
    const [markerY, setMarkerY] = useState(0);
    const markerSize = 40; // 네모 마커의 크기

    // 대한민국 위도와 경도 범위를 설정합니다. (대략적인 값)
    // 위도: 북위 33도 ~ 39도
    // 경도: 동경 124도 ~ 132도
    const latMin = 33.3;
    const latMax = 38.64;
    const lonMin = 125.2;
    const lonMax = 131;



    const handleMapClick = (event) => {
        // 이벤트가 발생한 DOM 요소(이미지)
        const mapElement = mapRef.current;
        if (!mapElement) return;

        // 이미지의 실제 크기와 클릭된 위치를 가져옵니다.
        const { width, height } = mapElement.getBoundingClientRect();
        const { offsetX, offsetY } = event.nativeEvent;

        // 클릭된 위치의 비율 계산
        const ratioX = offsetX / width;
        const ratioY = offsetY / height;

        // 비율을 이용하여 위도와 경도로 변환
        // Y축은 위도, X축은 경도에 해당하지만,
        // 컴퓨터 좌표계는 Y축이 아래로 갈수록 증가하므로 위도 계산 시 반전이 필요합니다.
        const calculatedLat = latMax - (ratioY * (latMax - latMin));
        const calculatedLon = lonMin + (ratioX * (lonMax - lonMin));

        setLat(calculatedLat);
        setLon(calculatedLon);

        // 마커 위치 설정 (클릭한 위치의 중앙으로 이동)
        setMarkerX(offsetX - markerSize / 2);
        setMarkerY(offsetY - markerSize / 2);
        setMarkerVisible(true);
    };

    useEffect(() => {
        // lat, lon이 변경되면 마커를 해당 위치로 이동
        if (lat !== null && lon !== null) {
            // 지도 이미지의 크기를 가져옵니다.
            const mapElement = mapRef.current;
            if (!mapElement) return;
            const { width, height } = mapElement.getBoundingClientRect();
            // 위도와 경도를 비율로 변환
            const ratioX = (lon - lonMin) / (lonMax - lonMin);
            const ratioY = (latMax - lat) / (latMax - latMin);
            // 클릭 위치를 계산
            const clickX = ratioX * width;
            const clickY = ratioY * height;

            // 마커 위치 설정
            setMarkerX(clickX - markerSize / 2);
            setMarkerY(clickY - markerSize / 2);
            setMarkerVisible(true);
        } else {
            setMarkerVisible(false);
        }
    }, [lat, lon]);

    return (
        <Box
            position="relative"
            width="100%"
            maxWidth="800px" // 이미지 최대 너비 설정
            height="auto"
            mx="auto"
            borderRadius="md"
            overflow="hidden"
        >
            <Image
                ref={mapRef}
                src={KoreaMapImg}
                alt="대한민국 지도"
                cursor="crosshair"
                onClick={handleMapClick}
                width="100%"
                height="auto"
                display="block"
            />
            {markerVisible && (
                <Box
                    position="absolute"
                    left={`${markerX}px`}
                    top={`${markerY}px`}
                    width={`${markerSize}px`}
                    height={`${markerSize}px`}
                    backgroundColor="#e2e2e2BF" // 반투명 회색
                    // borderRadius="4px"
                    pointerEvents="none" // 마커가 클릭 이벤트를 가리지 않도록
                />
            )}
        </Box>
    );

}