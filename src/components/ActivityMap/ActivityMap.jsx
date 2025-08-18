import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flex, Box, Text, Image, Input, Button, List, useBreakpointValue } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"

import KoreaMap from './KoreaMap.jsx';
// GeocodingReverse.jsx에서 함수와 데이터를 모두 가져옵니다.
import getAreaByLatLngDetailed, { fullAreasData } from '@/components/Misc/GeocodingReverse.jsx'; 

import SearchCircle1 from '@/assets/SearchCircle.svg';
import SearchCircle2 from '@/assets/SearchCircle2.svg';

export default function ActivityMap() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const isLightMode = useColorModeValue(true, false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    // --- 검색 기능 상태 ---
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const blurTimeoutRef = useRef(null);
    const throttleTimeoutRef = useRef(null); // 키보드 쓰로틀링을 위한 ref 추가

    // 1. 데이터 정제 (최초 1회만 실행)
    const flattenedAreas = useMemo(() => {
        const flatList = [];
        fullAreasData.forEach(province => {
            if (province.cities && province.cities.length > 0) {
                province.cities.forEach(city => {
                    flatList.push({
                        fullName: `${province.name} ${city.name}`,
                        provinceName: province.name,
                        cityName: city.name,
                        lat: city.lat_center,
                        lng: city.lng_center,
                    });
                });
            } else {
                flatList.push({
                    fullName: province.name,
                    provinceName: province.name,
                    cityName: '',
                    lat: province.lat_center,
                    lng: province.lng_center,
                });
            }
        });
        return flatList;
    }, []);

    // 2. 검색 로직 (입력값이 바뀔 때마다 실행)
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }
        if (!isInputFocused) setIsInputFocused(true);

        const filteredResults = flattenedAreas.filter(area =>
            area.fullName.includes(searchTerm)
        );
        setResults(filteredResults.slice(0, 7));
        setActiveIndex(0);
    }, [searchTerm, flattenedAreas]);
    
    // 컴포넌트 언마운트 시 모든 timeout 정리
    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }
            if (throttleTimeoutRef.current) { // 쓰로틀링 타이머도 정리
                clearTimeout(throttleTimeoutRef.current);
            }
        };
    }, []);

    // 3. 검색 결과 항목 클릭 핸들러
    const handleResultClick = (area) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        setLat(area.lat);
        setLon(area.lng);
        setSearchTerm(area.fullName);
        setResults([]);
        setIsInputFocused(false);
        setActiveIndex(0);
    };

    // 4. 키보드 이벤트 핸들러 (쓰로틀링 적용)
    const handleKeyDown = (e) => {
        // 결과가 없거나, 쓰로틀링 쿨다운 중이면 아무것도 하지 않음
        if (results.length === 0 || throttleTimeoutRef.current) {
            return;
        }

        const THROTTLE_DELAY = 100; // 100ms 딜레이
        let actionTaken = false; // 키보드 이벤트가 처리되었는지 여부

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev + 1) % results.length);
                actionTaken = true;
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => (prev - 1 + results.length) % results.length);
                actionTaken = true;
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && results[activeIndex]) {
                    handleResultClick(results[activeIndex]);
                }
                actionTaken = true;
                break;
            case 'Escape':
                setIsInputFocused(false);
                setResults([]);
                actionTaken = true;
                break;
            default:
                break;
        }

        // 키보드 액션이 있었다면 쓰로틀링 타이머 설정
        if (actionTaken) {
            throttleTimeoutRef.current = setTimeout(() => {
                throttleTimeoutRef.current = null; // 딜레이 이후 null로 초기화
            }, THROTTLE_DELAY);
        }
    };
    
    const locationName = getAreaByLatLngDetailed(lat, lon);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            w="100vw"
        >
            <Flex
                gap={isMobile ? "20px" : "200px"}
                alignItems="center"

                direction={isMobile ? "column" : "row"}
            >
                <Box>
                    <KoreaMap
                        setLat={setLat}
                        setLon={setLon}
                        selectedLat={lat}
                        selectedLon={lon}
                    />
                </Box>
                <Box>
                    <Text
                        ml="20px"
                        fontSize="20px"
                    >
                        MY LOCATION
                    </Text>
                    <Flex
                        justify="center"
                        w="100%"
                        mt="20px"
                    >
                        <Box position="relative" w="243px">
                            <Image
                                src={isLightMode ? SearchCircle2 : SearchCircle1}
                                position="absolute"
                                alt="Search"
                                w="15px"
                                top="10px"
                                zIndex="2"
                            />
        
                            <Input
                                w="100%"
                                border="none"
                                borderBottom="2px solid #000"
                                borderRadius="0"
                                outline="none"
                                _focus={{ boxShadow: 'none', borderColor: 'blue.500' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => {
                                    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
                                    setIsInputFocused(true);
                                }}
                                onBlur={() => {
                                    blurTimeoutRef.current = setTimeout(() => setIsInputFocused(false), 150);
                                }}
                                onKeyDown={handleKeyDown} // onKeyDown 핸들러 연결
                                placeholder="지역명 검색..."
                                px="20px"
                                position="relative"
                                zIndex="1"
                            />

                            {isInputFocused && results.length > 0 && !(results.length === 1 && results[0].fullName === searchTerm) && (
                                <Box
                                    position="absolute"
                                    top="100%"
                                    left="0"
                                    right="0"
                                    bg={isLightMode ? 'white' : 'gray.700'}
                                    border="1px solid"
                                    borderColor={isLightMode ? 'gray.200' : 'gray.600'}
                                    borderRadius="md"
                                    mt="2px"
                                    zIndex="1000"
                                    boxShadow="lg"
                                >
                                    <List.Root spacing={1} p="2">
                                        {results.map((area, index) => (
                                            <List.Item
                                                key={area.fullName}
                                                p="2"
                                                cursor="pointer"
                                                borderRadius="md"
                                                bg={index === activeIndex ? (isLightMode ? 'gray.100' : 'gray.600') : 'transparent'}
                                                _hover={{ bg: isLightMode ? 'gray.100' : 'gray.600' }}
                                                onMouseDown={() => handleResultClick(area)}
                                            >
                                                {area.fullName}
                                            </List.Item>
                                        ))}
                                    </List.Root>
                                </Box>
                            )}
                        </Box>
                    </Flex>
                    <Text
                        mt="20px"
                        maxW="430px"
                        whiteSpace="pre-wrap"
                    >
                        {locationName}
                        <br /><br />
                        촬영 레벨 : n단계
                        <br /><br />
                        은하수, 별 사진을 찍기에 적합하지 않아요
                        <br /><br />
                        ISO: n000~n200 사이 추천<br />
                        화이트 : n00~ n000<br />
                        ev : n.0 ~ n.0<br />
                        <br /><br />
                        비,  광해 다수
                    </Text>

                    <Button
                        my="20px"
                        w="100%"
                        h="50px"
                        bg="#000"
                        color="#fff"
                        outline="none"
                        border="none"
                        _hover={{
                            bg: "#333"
                        }}
                        _focus={{
                            outline: "none",
                            border: "none"
                        }}
                    >
                        사진 업로드
                    </Button>
                </Box>
            </Flex>
        </Flex>
    )
}
