import { Box, Icon, Image, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"


export default function Post({ post }) {
    // 다크/라이트 모드에 따른 색상 값 설정
    const postBg = useColorModeValue('#000', 'gray.100');
    const textColor = useColorModeValue('white', 'black');

    const isMobile = useBreakpointValue({ base: true, md: false });

    console.log(post);

    return (
        <Box
            h="auto"
            p="20px"

            maxW="800px"

            bg={postBg}

            mb={isMobile ? "50px" : "100px"}
        >
            {/* 적당히 테스트용 이미지 */}
            <Image src={`/images/${post.filename}`} />

            <Text
                color={textColor}

                mt="15px"
            >
                ISO : {post.iso}<br />
                SPD : 30s<br />
                ev   : 3.2v<br />
<br />
                PIC: {post.cameraModel}<br />
                {post.addressName}<br />
            </Text>
        </Box>
    );
}