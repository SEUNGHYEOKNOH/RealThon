import { Box, Flex, Text, Button, Icon, useBreakpointValue } from '@chakra-ui/react';
import { LuX } from "react-icons/lu";

import Post from '@/components/MyActivityMap/Post.jsx';

export default function MyActivityMap() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            w="100vw"
            h="100vh"
        >
            <Flex
                justifyContent="center"
                alignItems="center"

                mt="30px"
            >
                <Icon size="lg">
                    <LuX />
                </Icon>
            </Flex>

            <Flex
                justifyContent="center"
                alignItems="center"

                mt="30px"
            >
                <Text fontSize={isMobile ? "24px" : "45px"} fontWeight="bold">
                    Mea mappa caelestis
                </Text>
            </Flex>

            <Flex
                justifyContent="center"
                alignItems="center"

                direction={isMobile ? "column" : "row"}

                mt="30px"
                px={isMobile ? "20px" : "200px"}
                gap={isMobile ? "" : "80px"}
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