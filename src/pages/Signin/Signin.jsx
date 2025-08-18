import React from 'react';
import { Flex, Button, VStack, Heading, Icon, Text } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode";
// Social media icons
import { RiKakaoTalkFill } from "react-icons/ri"; // KakaoTalk icon
import { SiNaver } from "react-icons/si"; // Naver icon
import { FcGoogle } from "react-icons/fc"; // Google icon

// Social media login page component
export default function SocialLogin() {
    const formBg = useColorModeValue('white', 'gray.700');
    const buttonHoverBg = useColorModeValue('gray.100', 'gray.600');

    const handleSocialLogin = (platform) => {
        window.open(`https://realthon.ajb.kr/oauth2/authorization/${platform}`);
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
                w={{ base: "90%", md: "450px" }}
            >
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Welcome!
                </Heading>

                <Text mb={6} color="gray.500" textAlign="center">
                    Login with your social media account
                </Text>

                <VStack spacing={4} w="100%">
                    {/* KakaoTalk Login Button */}
                    <Button
                        w="100%"
                        h="50px"
                        bg="#FEE500" // KakaoTalk brand color
                        color="black"
                        borderRadius="lg"
                        onClick={() => handleSocialLogin('kakao')}
                        _hover={{
                            bg: "#F2DA00",
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                            outline: "none"
                        }}
                        _focus={{ outline: "none" }}
                        transition="all 0.2s"
                    >
                        <Icon as={RiKakaoTalkFill} mr={2} w={6} h={6} />
                        카카오톡으로 로그인
                    </Button>

                    {/* Naver Login Button */}
                    <Button
                        w="100%"
                        h="50px"
                        bg="#03C75A" // Naver brand color
                        color="white"
                        borderColor={useColorModeValue('gray.300', 'gray.500')}
                        outline="none"
                        borderRadius="lg"
                        onClick={() => handleSocialLogin('naver')}
                        _hover={{
                            bg: "#02B54D",
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                            outline: "none"
                        }}
                        _focus={{ outline: "none" }}
                        transition="all 0.2s"
                    >
                        <Icon as={SiNaver} mr={2} w={5} h={5} />
                        네이버로 로그인
                    </Button>

                    {/* Google Login Button */}
                    <Button
                        w="100%"
                        h="50px"
                        bg={useColorModeValue('gray.50', 'gray.600')}
                        color={useColorModeValue('gray.700', 'white')}
                        border="1px"
                        borderColor={useColorModeValue('gray.300', 'gray.500')}
                        borderRadius="lg"
                        onClick={() => handleSocialLogin('google')}
                        _hover={{
                            bg: buttonHoverBg,
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                        _focus={{ outline: "none" }}
                        transition="all 0.2s"
                    >
                        <Icon as={FcGoogle} mr={2} w={6} h={6} />
                        구글로 로그인
                    </Button>
                </VStack>
            </Flex>
        </Flex>
    );
}