import { Box, Flex, Text, Input, Image } from '@chakra-ui/react';

import Phone from './Phone.jsx';

import SearchCircle from '@/assets/SearchCircle.svg';

export default function ChoicePhone() {
    return (
        <Box bg="#f4f4f4" minH="100vh">
            <Flex direction="column" justify="center" w="100vw" h="100vh">
                <Flex justify="center" w="100%">
                    <Text fontSize="30px">SELECT DEVICE</Text>
                </Flex>
                <Flex justify="center" w="100%" mt="40px">
                    <Box position="relative">
                        <Image src={SearchCircle} position="absolute" alt="Search" left="-7px" top="10px" zIndex="1" />

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

                <Box mt="70px" w="100%" h="400px" overflowX="scroll" whiteSpace="nowrap" overflowY="hidden">
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                    <Phone phoneModelName="iPhone 13" />
                </Box>
            </Flex>
        </Box>
    );
}
