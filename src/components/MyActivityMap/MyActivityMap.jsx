import { useEffect, useState } from 'react';
import { Box, Flex, Text, Button, Icon, useBreakpointValue } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 훅을 import 합니다.
import { useQuery } from '@tanstack/react-query';

import Post from '@/components/MyActivityMap/Post.jsx';
import { getPhotos } from "@/utils/Api.jsx";;

export default function MyActivityMap({ setIsOnMyActivityMap, location }) {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const navigate = useNavigate(); // 2. useNavigate 훅을 실행하여 navigate 함수를 생성합니다.

    // 3. 아이콘 클릭 시 호출될 뒤로 가기 함수를 정의합니다.
    const handleGoBack = () => {
        setIsOnMyActivityMap(false); // MyActivityMap을 닫습니다.
    };

    const [loc, setLoc] = useState("");

    const [posts, setPosts] = useState([]);

    const { data: photos, refetch: refetchPhotos } = useQuery({
        queryKey: ['photos', loc],
        queryFn: () => getPhotos(loc),
        enabled: location !== "선택된 지역이 없습니다"
    });

    useEffect(() => {
        if (photos) {
            setPosts(photos);
            console.log(photos);
        }
    }, [photos]);

    useEffect(() => {
        if (location && location !== "선택된 지역이 없습니다") {
            setLoc(location.split(' ')[0]); // location에서 첫 번째 단어만 추출
            refetchPhotos();
        }
    }, [location]);

    return (
        <Box
            w="100vw"
            h="100vh"
            bg="#f4f4f4"
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
            
            <Box
                h="calc(100% - 100px)"
                overflowY="scroll"
                mt="30px"
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    mt="30px"
                    px={isMobile ? '20px' : '200px'}
                >
                    {isMobile ? (
                        // 모바일일 경우: 하나의 Box에 모든 Post를 렌더링
                        <Box>
                            {posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                        </Box>
                    ) : (
                        // 데스크탑일 경우: 두 개의 Box에 Post를 번갈아가며 렌더링
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            gap='80px'
                        >
                            {/* 첫 번째 열 (짝수 인덱스: 0, 2, 4, ...) */}
                            <Box>
                                {posts
                                    .filter((_, index) => index % 2 === 0)
                                    .map((post) => (
                                        <Post key={post.id} post={post} />
                                    ))}
                            </Box>
                            {/* 두 번째 열 (홀수 인덱스: 1, 3, 5, ...) */}
                            <Box>
                                {posts
                                    .filter((_, index) => index % 2 !== 0)
                                    .map((post) => (
                                        <Post key={post.id} post={post} />
                                    ))}
                            </Box>
                        </Flex>
                    )}
                </Flex>
            </Box>

           
        </Box>
    );
}
