import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flex, Box, Text, Image, Input, Button, List, ListItem } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"

import KoreaMap from './KoreaMap.jsx';
// GeocodingReverse.jsx에서 함수와 데이터를 모두 가져옵니다.
import GeocodingReverse, { fullAreasData } from '@/components/Misc/GeocodingReverse.jsx'; 

import SearchCircle1 from '@/assets/SearchCircle.svg';
import SearchCircle2 from '@/assets/SearchCircle2.svg';

export default function ActivityMap() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const isLightMode = useColorModeValue(true, false);

    // --- 검색 기능 상태 ---
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    
    // setTimeout 참조를 저장하여 메모리 누수 방지
    const blurTimeoutRef = useRef(null);

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
                // console.log(flatList.map(item => item.fullName));
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
        // 사용자가 지역을 선택한 후 다시 입력 시작 시, 결과창을 보여주기 위함
        if (!isInputFocused) setIsInputFocused(true);

        const filteredResults = flattenedAreas.filter(area =>
            area.fullName.includes(searchTerm)
        );
        setResults(filteredResults.slice(0, 7)); // 최대 7개 결과만 보여주기
    }, [searchTerm, flattenedAreas, isInputFocused]);

    // 컴포넌트 언마운트 시 timeout 정리
    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }
        };
    }, []);

    // 3. 검색 결과 항목 클릭 핸들러
    const handleResultClick = (area) => {
        // 기존 timeout이 있다면 취소
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        // 위도, 경도 상태 업데이트 (KoreaMap에 반영됨)
        setLat(area.lat);
        setLon(area.lng);
        // 입력창에 선택된 지역명 설정
        setSearchTerm(area.fullName);
        // 결과창 닫기
        setResults([]);
        setIsInputFocused(false);
    };

    // GeocodingReverse 함수 이름 변경 (기존 컴포넌트명과 충돌 방지)
    // GeocodingReverse.jsx 파일에서 default export 된 함수를 GeocodingReverse로 사용
    const locationName = GeocodingReverse(lat, lon);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            h="100vh"
            w="100vw"
        >
            <Flex
                gap="200px"
                alignItems="center" // 세로 정렬을 위해 추가
            >
                <Box>
                    <KoreaMap
                        setLat={setLat}
                        setLon={setLon}
                        // 검색 결과 선택 시 지도를 해당 위치로 이동시키기 위해 lat, lon props 전달
                        lat={lat}
                        lon={lon}
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
                        {/* 검색창과 결과 목록을 감싸는 컨테이너 */}
                        <Box position="relative" w="243px">
                            <Image
                                src={isLightMode ? SearchCircle2 : SearchCircle1}
                                position="absolute"
                                alt="Search"
                                w="15px"
                                top="10px"
                                zIndex="2" // Input보다 위에 오도록 zIndex 조정
                            />
        
                            <Input
                                w="100%"
                                border="none"
                                borderBottom="2px solid #000"
                                borderRadius="0"
                                outline="none"
                                _focus={{ boxShadow: 'none', borderColor: 'blue.500' }} // 포커스 시 테두리 색상 변경

                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => {
                                    // 기존 timeout이 있다면 취소
                                    if (blurTimeoutRef.current) {
                                        clearTimeout(blurTimeoutRef.current);
                                    }
                                    setIsInputFocused(true);
                                }}

                                // onBlur를 사용하면 결과 클릭이 안되므로, 컨테이너의 onMouseLeave 등으로 처리하거나
                                // 결과 아이템의 onMouseDown을 사용합니다. 여기서는 onBlur에 delay를 줍니다.
                                onBlur={() => {
                                    blurTimeoutRef.current = setTimeout(() => {
                                        setIsInputFocused(false);
                                    }, 150);
                                }}
                                placeholder="지역명 검색..."
                                px="20px"
                                position="relative" // zIndex 적용을 위해
                                zIndex="1"
                            />

                            {/* 4. 검색 결과 UI 렌더링 */}
                            {isInputFocused && results.length > 0 &&
                                !(results.length === 1 && results[0].fullName === searchTerm) && (
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
                                    zIndex="1000" // 최상단에 오도록 zIndex 설정
                                    boxShadow="lg"
                                >
                                    <List.Root spacing={1} p="2">
                                        {results.map((area) => (
                                            <List.Item
                                                key={area.fullName}
                                                p="2"
                                                cursor="pointer"
                                                borderRadius="md"
                                                _hover={{ bg: isLightMode ? 'gray.100' : 'gray.600' }}
                                                // onMouseDown은 onBlur보다 먼저 실행되어 클릭 이벤트가 정상 작동합니다.
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
                        {/* GeocodingReverse 함수 호출 결과를 표시 */}
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
                        mt="20px"
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
