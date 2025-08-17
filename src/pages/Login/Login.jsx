import React, { useState } from 'react';
import { 
    Flex, 
    Input, 
    Button,
    Link,
    VStack,
    Heading,
    Icon,
    Box
} from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"
import { MdOutlineMail, MdLockOutline } from "react-icons/md";


// ActivityMap의 디자인을 참고한 로그인 페이지 컴포넌트
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 다크/라이트 모드에 따른 색상 값 설정
    const formBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const buttonBg = useColorModeValue('gray.800', 'blue.300');
    const buttonColor = useColorModeValue('white', 'gray.800');
    const buttonHoverBg = useColorModeValue('gray.700', 'blue.200');

    const handleLogin = () => {
        // 실제 로그인 로직을 여기에 구현합니다.
        console.log('Login attempt with:', { email, password });
        // 예: alert(`Email: ${email}, Password: ${password}`);
    };

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            h="100vh"
            w="100vw"
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Flex
                direction="column"
                alignItems="center"
                bg={formBg}
                p={12}
                borderRadius="xl"
                boxShadow="lg"
                gap={4}
                w={{ base: "90%", md: "450px" }} // 반응형 너비 설정
            >
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Welcome Back!
                </Heading>
                
                {/* VStack을 사용하여 폼 요소들을 수직으로 정렬하고 간격을 줍니다. */}
                <VStack spacing={6} w="100%">
                    {/* 이메일 입력창 */}
                    <Box position="relative" w="100%">
                        <Box 
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            zIndex={2}
                            pointerEvents="none"
                            pl={3} // 아이콘 위치 조절
                        >
                            <Icon color="gray.400">
                                <MdOutlineMail />
                            </Icon>
                        </Box>
                        <Input
                            type="email"
                            placeholder="이메일 주소"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="flushed" // ActivityMap의 하단 테두리 스타일과 유사
                            borderColor={borderColor}
                            focusBorderColor={buttonBg}
                            size="lg"
                            pl="2.5rem" // 아이콘 공간 확보
                        />
                    </Box>

                    {/* 비밀번호 입력창 */}
                    <Box position="relative" w="100%">
                        <Box 
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            zIndex={2}
                            pointerEvents="none"
                            pl={3} // 아이콘 위치 조절
                        >
                            <Icon color="gray.400">
                                <MdLockOutline />
                            </Icon>
                        </Box>
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="flushed"
                            borderColor={borderColor}
                            focusBorderColor={buttonBg}
                            size="lg"
                            pl="2.5rem" // 아이콘 공간 확보
                        />
                    </Box>
                </VStack>

                {/* 로그인 버튼 */}
                <Button
                    mt={8}
                    w="100%"
                    h="50px"
                    bg={buttonBg}
                    color={buttonColor}
                    borderRadius="lg"
                    onClick={handleLogin}
                    _hover={{
                        bg: buttonHoverBg,
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg'
                    }}
                    _focus={{
                        outline: "none",
                    }}
                    transition="all 0.2s"
                >
                    로그인
                </Button>

                {/* 추가 옵션 링크 */}
                <Flex mt={6} w="100%" justifyContent="space-between">
                    <Link color="blue.500" href="#" fontSize="sm">
                        비밀번호를 잊으셨나요?
                    </Link>
                    <Link color="blue.500" href="/signup" fontSize="sm">
                        회원가입
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}
