import React, { useRef, useState } from 'react';
import { Flex, Box, Text, Image, Input, Button } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"

import KoreaMap from './KoreaMap.jsx';
import GeocodingReverse from '@/components/Misc/GeocodingReverse.jsx'; // 지역명 찾기

import SearchCircle1 from '@/assets/SearchCircle.svg';
import SearchCircle2 from '@/assets/SearchCircle2.svg';

export default function ActivityMap() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const isLightMode = useColorModeValue(true, false);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            h="100vh"
            w="100vw"
        >
            <Flex
                gap="200px"
            >
                <Box>
                    <KoreaMap
                        setLat={setLat}
                        setLon={setLon}
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
                        <Box
                            position="relative"
                        >
                            <Image
                                src={isLightMode ? SearchCircle2 : SearchCircle1}
                                position="absolute"
                                alt="Search"
                                w="15px"
                                top="10px"
                                zIndex="1"
                            />
        
                            <Input
                                w="243px"
                                border="none"
                                borderBottom="2px solid #000"
                                borderRadius="0"
                                outline="none"
        
                                px="20px"
                            />
                        </Box>
                    </Flex>
                    <Text
                        mt="20px"
                        maxW="430px"
                        whiteSpace="pre-wrap"
                    >
                        {GeocodingReverse(lat, lon)}
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