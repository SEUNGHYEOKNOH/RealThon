import { Box, Flex, Text, Button } from '@chakra-ui/react';

export default function Main() {
    return (
        <Flex direction="column" align="center" justify="center" bg="gray.900" w="100vw" h="100vh" color="white">
            <Text fontSize="4xl" fontWeight="bold" mb={2} textShadow="0px 2px 8px rgba(0,0,0,0.3)">
                MEA MAPPA cjscpwleh
            </Text>
            <Text fontSize="xl" mb={8} color="gray.200" textShadow="0px 2px 8px rgba(0,0,0,0.2)">
                SINCE 2025
            </Text>
            {/* 필요하다면 버튼이나 다른 요소 추가 가능 */}
            <Button colorScheme="teal" size="lg">
                시작하기
            </Button>
        </Flex>
    );
}
