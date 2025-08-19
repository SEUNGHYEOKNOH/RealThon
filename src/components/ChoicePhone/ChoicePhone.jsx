import { Box, Flex, Text, Input, Image } from '@chakra-ui/react';

import Phone from './Phone.jsx';
import SearchCircle from '@/assets/SearchCircle.svg';

// 1. 각 핸드폰 모델에 맞는 이미지 파일을 import 합니다.
//    '@'는 보통 'src' 폴더를 가리킵니다. 실제 프로젝트 경로에 맞게 수정해주세요.
//    (예: src/assets/phone/iPhone_14.png)
import IPhone14Image from '@/assets/phone/I14.png';
import IPhone13Image from '@/assets/phone/I13.png';
import SamsungS10Image from '@/assets/phone/S10.png';
import SamsungS20Image from '@/assets/phone/S20.png';
import GPixel8ProImage from '@/assets/phone/G8WB.png';
import GPixel8ProClayImage from '@/assets/phone/G8W.png';

export default function ChoicePhone() {
    // 2. 핸드폰 모델 이름과 import된 이미지 소스를 배열로 관리합니다.
    const phoneList = [
        { name: 'iPhone 14', image: IPhone14Image },
        { name: 'iPhone 13', image: IPhone13Image },
        { name: 'Samsung S10', image: SamsungS10Image },
        { name: 'Samsung S20', image: SamsungS20Image },
        { name: 'G Pixel8 Pro', image: GPixel8ProImage },
        { name: 'G Pixel8 Pro', image: GPixel8ProImage }, // 기존 코드의 중복 항목 유지
        { name: 'G Pixel8 Pro Clay', image: GPixel8ProClayImage },
    ];

    return (
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

            {/* 3. map 함수를 사용해 Phone 컴포넌트를 동적으로 렌더링하고, imageSrc prop을 전달합니다. */}
            <Box mt="70px" w="100%" h="400px" overflowX="scroll" whiteSpace="nowrap" overflowY="hidden">
                {phoneList.map((phone, index) => (
                    <Phone
                        key={index} // 리스트 렌더링 시 고유한 key가 필요합니다.
                        phoneModelName={phone.name}
                        imageSrc={phone.image}
                    />
                ))}
            </Box>
        </Flex>
    );
}
