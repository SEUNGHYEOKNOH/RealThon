import React from 'react';
import { Box, Image, Text, Progress, Flex } from '@chakra-ui/react';

// Vite/CRA 환경: 아래 경로 맞게 조정해야함!
import cloudLeft from './img/image1.png';
import cloudRight from './img/image2.png';

function Loading({ percent }) {
    const maxMove = 300;
    const leftCloudX = (-percent / 100) * maxMove;
    const rightCloudX = (percent / 100) * maxMove;

    return (
        <Box position="relative" w="100vw" h="100vh" overflow="hidden" bg="#222" fontFamily="Arial, sans-serif">
            {/* 왼쪽 구름 */}
            <Image
                src={cloudLeft}
                alt="왼쪽구름"
                position="absolute"
                top={0}
                left="50%"
                w="50vw"
                h="100vh"
                objectFit="cover"
                zIndex={1}
                pointerEvents="none"
                transition="transform 0.8s cubic-bezier(0.83, 0, 0.17, 1)"
                sx={{
                    transform: `translateX(calc(-100% + ${leftCloudX}px))`,
                }}
            />
            {/* 오른쪽 구름 */}
            <Image
                src={cloudRight}
                alt="오른쪽구름"
                position="absolute"
                top={0}
                left="50%"
                w="50vw"
                h="100vh"
                objectFit="cover"
                zIndex={1}
                pointerEvents="none"
                transition="transform 0.8s cubic-bezier(0.83, 0, 0.17, 1)"
                sx={{
                    transform: `translateX(${rightCloudX}px)`,
                }}
            />
            {/* 중앙 콘텐츠 */}
            <Flex direction="column" align="center" justify="center" w="100vw" h="100vh" position="relative" zIndex={2}>
                <Text fontSize="2.5rem" color="white" mb="2" textShadow="0 2px 8px rgba(0,0,0,0.3)">
                    MEA MAPPA CAELESTIS
                </Text>
                <Text fontSize="1.2rem" color="white" mb="7" textShadow="0 2px 8px rgba(0,0,0,0.2)">
                    SINCE 2025
                </Text>
                <Flex align="center">
                    <Progress
                        value={percent}
                        w="300px"
                        h="5px"
                        bg="#eee"
                        colorScheme="whiteAlpha"
                        borderRadius="3px"
                        mr="3"
                        hasStripe
                        sx={{
                            '& > div': { bg: '#fff', borderRadius: '3px' },
                        }}
                    />
                    <Text fontSize="1rem" color="white" textShadow="0 2px 8px rgba(0,0,0,0.2)">
                        {percent}%
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Loading;
