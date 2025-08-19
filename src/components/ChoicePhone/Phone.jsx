import { Box, Flex, Text, Image } from '@chakra-ui/react';

// ChoicePhone으로부터 imageSrc와 phoneModelName을 props로 전달받습니다.
export default function Phone({ imageSrc, phoneModelName, setPhoneModel, phoneId, setPhoneId }) {
    return (
        // 가로 스크롤 리스트의 각 아이템이 올바르게 보이도록 스타일을 조정합니다.
        <Flex
            direction="column"
            align="center"
            justify="center"
            display="inline-flex" // 가로 정렬을 위해 inline-flex 사용
            h="100%"
            mx="30px" // 아이템 간의 가로 여백
            cursor="pointer"

            onClick={() => {
                setPhoneModel(phoneModelName);
                setPhoneId(phoneId);
            }}
        >
            <Image
                src={imageSrc}
                alt={`${phoneModelName} 이미지`}
                h="80%" // 부모 요소(Box) 높이의 80%를 차지
                objectFit="contain" // 이미지 비율을 유지하면서 컨테이너에 맞춤
            />
            <Text mt="15px" fontSize="18px" fontWeight="bold">
                {phoneModelName}
            </Text>
        </Flex>
    );
}
