import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import PhoneFrame from '@/assets/PhoneFrame.png';

export default function SelectPhone() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const phoneData = {
        name: 'Galaxy S25',
        model: 'BEST SHOT',
        data: `줌
광학줌 21배
광학줌 21배
초점거리
f = 4.1~86.1 mm

(35 mm filmequivalent : 23 ~ 483 mm)
4.5-45.0 mm

(35 mm 카메라 환산 25-250 mm 상당의 촬영 화각)
손떨림 보정
OIS (광학식 손떨림 보정)
렌즈 시프트 방식과 전자식 병용(정지화상)
렌지 시프트 방식(동영상)
F No
2.8(W) ~ 5.9 (T)
f/3.5-5.8
셔터 스피드
Auto : 1/8 ~1/2,000
secManual : 16 ~1/2,000sec
1/2000 ~ 1초
1/4000초 (고속연사시 최고 속도),
4초 (장면 모드의 [불꽃놀이])`,
    };

    return (
        <Box bg="#f4f4f4de" minH="100vh">
            <Flex w="100vw" h="100vh" justify="center" align="center">
                <Box w="1200px" pr="20px">
                    <Box mx="-50px" float="left">
                        <Image src={PhoneFrame} alt="Phone Frame" h="503px" />
                    </Box>
                    <Box py="20px">
                        <Text fontSize="40px">Galaxy S25</Text>
                        <Text fontSize="20px">BEST SHOT</Text>

                        <Flex maxW="757px" h="350px" border="1px solid black" overflowY="scroll">
                            <Box w="50%">
                                <Text whiteSpace="pre-wrap">{phoneData.data}</Text>
                            </Box>
                            <Box w="50%">
                                <Text whiteSpace="pre-wrap">
                                    은하수 ㅇ내ㅓ
                                    <br />
                                    ㅇdsklnfkldnsl
                                    <br />
                                    fisdfiopsdj
                                    <br />
                                    fpsidjfpiosdj
                                    <br />
                                    sdfpiojpsodfjpo
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
