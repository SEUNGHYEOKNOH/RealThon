import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flex, Box, Text, Image, Input, Textarea, Button, List, useBreakpointValue, Dialog, Portal, CloseButton } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import KoreaMap from './KoreaMap.jsx';
import getAreaByLatLngDetailed, { fullAreasData } from '@/components/Misc/GeocodingReverse.jsx'; 
import MyActivityMap from '../MyActivityMap/MyActivityMap.jsx';
import { getStarsVisibility, getLightPollution } from "@/utils/Api.jsx";

import SearchCircle1 from '@/assets/SearchCircle.svg';
import SearchCircle2 from '@/assets/SearchCircle2.svg';

export default function ActivityMap() {
    const navigate = useNavigate();

    const [isOnMyActivityMap, setIsOnMyActivityMap] = useState(false);
    const handleNavigateToAlbum = () => {
        setIsOnMyActivityMap(true);
    };

    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    const isLightMode = useColorModeValue(true, false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    // --- 검색 기능 상태 ---
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const blurTimeoutRef = useRef(null);
    const throttleTimeoutRef = useRef(null);

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
            if (throttleTimeoutRef.current) {
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
        if (results.length === 0 || throttleTimeoutRef.current) {
            return;
        }

        const THROTTLE_DELAY = 100;
        let actionTaken = false;

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

        if (actionTaken) {
            throttleTimeoutRef.current = setTimeout(() => {
                throttleTimeoutRef.current = null;
            }, THROTTLE_DELAY);
        }
    };
    
    const locationName = getAreaByLatLngDetailed(lat, lon);

    const [starsVisibilityGrade, setStarsVisibilityGrade] = useState("보통");
    const [starsVisibilityScore, setStarsVisibilityScore] = useState(0);
    // 별 볼 수 있는 확률
    const { data: starsVisibility } = useQuery({
        queryKey: ['starsVisibility', lat, lon],
        queryFn: () => getStarsVisibility(lat, lon),
        enabled: !!lat && !!lon
    });
    useEffect(() => {
        if (starsVisibility) {
            setStarsVisibilityGrade(starsVisibility.grade);
            setStarsVisibilityScore(starsVisibility.score);
        }
    }, [starsVisibility]);

    const [lightPollutionScore, setLightPollutionScore] = useState(0);
    const [lightPollutionText, setLightPollutionText] = useState("알 수 없음");
    // 광해
    const { data: lightPollution } = useQuery({
        queryKey: ['lightPollution', lat, lon],
        queryFn: () => getLightPollution(lat, lon),
        enabled: !!lat && !!lon
    });
    useEffect(() => {
        if (lightPollution) {
            setLightPollutionScore(lightPollution.value);
            if (lightPollution.value >= 8.0) {
                setLightPollutionText("매우 높음");
            } else if (lightPollution.value >= 6.0) {
                setLightPollutionText("높음");
            } else if (lightPollution.value >= 4.0) {
                setLightPollutionText("보통");
            } else if (lightPollution.value >= 2.0) {
                setLightPollutionText("낮음");
            } else {
                setLightPollutionText("매우 낮음");
            }
        }
    }, [lightPollution]);

    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // 파일 업로드 mutation 훅
    const uploadMutation = useMutation({
        mutationFn: async ({ file, comment }) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('comment', comment);

            return axios.post('/api/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            alert('사진이 성공적으로 업로드되었습니다!');
            setImage(null);
            setDescription('');
        },
        onError: (error) => {
            console.error('사진 업로드 실패:', error);
            alert('사진 업로드에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const handleUpload = () => {
        if (image) {
            uploadMutation.mutate({ file: image, comment: description });
        } else {
            alert('업로드할 사진을 선택해주세요.');
        }
    };

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
                                onKeyDown={handleKeyDown}
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
                        {locationName}<br />
                        촬영 레벨 : {starsVisibilityScore}단계<br />
                        은하수, 별을 촬영하기에 "{starsVisibilityGrade}"이에요<br />
                        광해 {lightPollutionText}
                    </Text>
                    
                    <Flex
                        w="100%"
                        gap="20px"
                    >
                        <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
                            <Dialog.Trigger asChild>
                                <Button
                                    my="20px"
                                    h="50px"
                                    backgroundColor="#000"
                                    color="#fff"
                                    outline="none"
                                    border="none"
                                    _hover={{
                                        backgroundColor: "#333"
                                    }}
                                    _focus={{
                                        outline: "none",
                                        border: "none"
                                    }}
                                    transition="0.3s all easy-in-out"
                                >
                                    사진 업로드
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>사진 게시하기</Dialog.Title>
                                            <Dialog.CloseTrigger asChild>
                                                <CloseButton size="sm" />
                                            </Dialog.CloseTrigger>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            {image && (
                                                <Flex
                                                    mt="10px"
                                                    mb="20px"
                                                    justify="center"
                                                >
                                                    <Image
                                                        src={URL.createObjectURL(image)}
                                                        alt="Uploaded Preview"
                                                        maxH="250px"
                                                        objectFit="cover"
                                                    />
                                                </Flex>
                                            )}
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                border="none"
                                            />

                                            <Textarea
                                                mt="10px"
                                                w="100%"
                                                h="60px"
                                                value={description}
                                                placeholder="사진 설명을 입력하세요"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <Button
                                                mt="10px"
                                                w="100%"
                                                h="50px"
                                                bg="#4CAF50"
                                                color="#FFFFFF"
                                                _hover={{
                                                    bg: '#45a049',
                                                }}
                                                isLoading={uploadMutation.isLoading}
                                                onClick={handleUpload}

                                            >
                                                업로드
                                            </Button>
                                        </Dialog.Body>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                        
                        <Button
                            mt="20px"
                            h="50px"
                            bg="#ffffffff"
                            color="#000000ff"
                            outline="none"
                            border="none"
                            _hover={{
                                bg: '#e2e8f0',
                            }}
                            _focus={{
                                outline: 'none',
                                border: 'none',
                            }}
                            onClick={handleNavigateToAlbum}
                            transition="0.3s all easy-in-out"
                            // lat lon 0이면 disabled
                            disabled={lat === 0 && lon === 0}
                            cursor={lat === 0 && lon === 0 ? 'not-allowed' : 'pointer'}
                        >
                            내 앨범 보기
                        </Button>
                    </Flex>
                </Box>
            </Flex>

            <Box
                position="fixed"
                top="0"
                left="0"
                right="0"
                bottom="0"
                zIndex="overlay"
                transition="all 0.3s ease-in-out"
                transform={isOnMyActivityMap ? 'translateY(0)' : 'translateY(100%)'}
            >
                <MyActivityMap
                    setIsOnMyActivityMap={setIsOnMyActivityMap}
                    location={locationName}
                />
            </Box>
        </Flex>
    )
}