import { Box, Flex, Text, Button, Icon, useBreakpointValue } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 훅을 import 합니다.

import Post from '@/components/MyActivityMap/Post.jsx';

export default function MyActivityMap({ setIsOnMyActivityMap }) {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate(); // 2. useNavigate 훅을 실행하여 navigate 함수를 생성합니다.

    // 3. 아이콘 클릭 시 호출될 뒤로 가기 함수를 정의합니다.
    const handleGoBack = () => {
        setIsOnMyActivityMap(false); // MyActivityMap을 닫습니다.
    };

    return (
        <Box
            w="100vw"
            h="100vh"
            bg="#f4f4f4de"
        >
            {/* 4. 아이콘을 감싸는 Flex와 Icon 컴포넌트를 수정합니다. */}
            <Flex
                justifyContent="center" // 아이콘을 오른쪽 정렬로 변경 (일반적인 UI)
                alignItems="center"
                pt="30px"
                px="40px" // 좌우 여백 추가
            >
                <Icon
                    as={LuX} // as 프롭을 사용해 아이콘을 렌더링하는 것이 권장됩니다.
                    boxSize="30px" // 아이콘 크기 지정 (size="lg" 대신)
                    cursor="pointer" // 마우스를 올렸을 때 클릭 가능함을 표시
                    onClick={handleGoBack} // 클릭 이벤트에 핸들러 함수 연결
                    transition="all 0.3s ease-in-out"

                    // 호버 시 360도 회전
                    _hover={{
                        transform: 'rotate(360deg)',
                    }}
                />
            </Flex>

            <Flex justifyContent="center" alignItems="center" mt="30px">
                <Text fontSize={isMobile ? '24px' : '45px'} fontWeight="bold">
                    Mea mappa caelestis
                </Text>
            </Flex>

            <Flex
                justifyContent="center"
                alignItems="center"
                direction={isMobile ? 'column' : 'row'}
                mt="30px"
                px={isMobile ? '20px' : '200px'}
                gap={isMobile ? '' : '80px'}
            >
                <Box>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </Box>

                <Box>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </Box>
            </Flex>
        </Box>
    );
}
