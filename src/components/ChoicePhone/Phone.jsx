import { Box, Flex, Text, Image } from '@chakra-ui/react';

import PhoneFrame from '@/assets/PhoneFrame.png';

export default function Phone({ phoneModelName }) {
    return (
        <Box display="inline-block">
            <Flex direction="column" align="center" gap="20px">
                <Flex w="100%" justify="center">
                    <Image src={PhoneFrame} alt="Phone Frame" objectFit="cover" w="293px" />
                </Flex>

                <Flex>
                    <Text fontSize="30px">{phoneModelName}</Text>
                </Flex>
            </Flex>
        </Box>
    );
}
