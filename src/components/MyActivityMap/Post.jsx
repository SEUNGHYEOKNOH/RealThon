import { Box, Icon, Image, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"


export default function Post() {
    // 다크/라이트 모드에 따른 색상 값 설정
    const postBg = useColorModeValue('#000', 'gray.100');
    const textColor = useColorModeValue('white', 'black');

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            h="auto"
            p="20px"

            bg={postBg}

            mb={isMobile ? "50px" : "100px"}
        >
            {/* 적당히 테스트용 이미지 */}
            <Image src="https://embed.pixiv.net/artwork.php?illust_id=131294325&mdate=1749305318" />

            <Text
                color={textColor}

                mt="15px"
            >
                ISO : 3200<br />
                SPD : 30s<br />
                ev   : 3.2v<br />
<br />
                PIC: GALAXY. 22+<br />
                대한민국 경상북도 포항시 송정동<br />
            </Text>
        </Box>
    );
}