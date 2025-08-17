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
import { useColorModeValue } from "@/components/ui/color-mode";
import { MdOutlineMail, MdLockOutline, MdPersonOutline } from "react-icons/md";


// LoginPage의 디자인을 참고한 회원가입 페이지 컴포넌트
export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 다크/라이트 모드에 따른 색상 값 설정
    const formBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.300', 'gray.600');
    const buttonBg = useColorModeValue('gray.800', 'blue.300');
    const buttonColor = useColorModeValue('white', 'gray.800');
    const buttonHoverBg = useColorModeValue('gray.700', 'blue.200');

    const handleSignUp = () => {
        // 실제 회원가입 로직을 여기에 구현합니다.
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log('Sign up attempt with:', { fullName, email, password });
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
                    Create Your Account
                </Heading>
                
                {/* VStack을 사용하여 폼 요소들을 수직으로 정렬하고 간격을 줍니다. */}
                <VStack spacing={6} w="100%">
                    {/* 이름 입력창 */}
                    <Box position="relative" w="100%">
                        <Box 
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            zIndex={2}
                            pointerEvents="none"
                            pl={3}
                        >
                            <Icon as={MdPersonOutline} color="gray.400" />
                        </Box>
                        <Input
                            type="text"
                            placeholder="이름"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            variant="flushed"
                            borderColor={borderColor}
                            focusBorderColor={buttonBg}
                            size="lg"
                            pl="2.5rem"
                        />
                    </Box>

                    {/* 이메일 입력창 */}
                    <Box position="relative" w="100%">
                        <Box 
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            zIndex={2}
                            pointerEvents="none"
                            pl={3}
                        >
                            <Icon as={MdOutlineMail} color="gray.400" />
                        </Box>
                        <Input
                            type="email"
                            placeholder="이메일 주소"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="flushed"
                            borderColor={borderColor}
                            focusBorderColor={buttonBg}
                            size="lg"
                            pl="2.5rem"
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
                            pl={3}
                        >
                            <Icon as={MdLockOutline} color="gray.400" />
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
                            pl="2.5rem"
                        />
                    </Box>

                     {/* 비밀번호 확인 입력창 */}
                     <Box position="relative" w="100%">
                        <Box 
                            position="absolute"
                            top="50%"
                            left="0"
                            transform="translateY(-50%)"
                            zIndex={2}
                            pointerEvents="none"
                            pl={3}
                        >
                            <Icon as={MdLockOutline} color="gray.400" />
                        </Box>
                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            variant="flushed"
                            borderColor={borderColor}
                            focusBorderColor={buttonBg}
                            size="lg"
                            pl="2.5rem"
                        />
                    </Box>
                </VStack>

                {/* 회원가입 버튼 */}
                <Button
                    mt={8}
                    w="100%"
                    h="50px"
                    bg={buttonBg}
                    color={buttonColor}
                    borderRadius="lg"
                    onClick={handleSignUp}
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
                    회원가입
                </Button>

                {/* 추가 옵션 링크 */}
                <Flex mt={6} w="100%" justifyContent="center">
                    <Link color="blue.500" href="/login" fontSize="sm">
                        이미 계정이 있으신가요? 로그인
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}
