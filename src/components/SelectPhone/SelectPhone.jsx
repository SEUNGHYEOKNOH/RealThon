import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import GetPhoneImg from "@/utils/GetPhoneImg.jsx"
import { getCameraSetting } from "@/utils/Api.jsx";

export default function SelectPhone({ PhoneModel, phoneId, goToSection, currentSectionIndex }) {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const [phoneImage, setPhoneImage] = useState(GetPhoneImg(""));

    useEffect(() => {
        if (PhoneModel !== undefined && PhoneModel) {
            console.log("PhoneModel:", PhoneModel);
            setPhoneImage(GetPhoneImg(PhoneModel));
        }
    }, [PhoneModel]);

    useEffect(() => {
        if (currentSectionIndex === 3 && (!PhoneModel || PhoneModel === "" || phoneId === 0 || phoneId === undefined)) {
            alert("디바이스를 먼저 선택해주세요!");
            goToSection(2); // 디바이스 선택 섹션으로 이동
        }
    }, [PhoneModel, phoneId, goToSection]);


    // 이거 참고해서 작성하면 될 듯
    const [phoneModel, setPhoneModel] = useState("");
    const [apertureF, setApertureF] = useState(""); // 조리개값
    const [exposureS, setExposureS] = useState(""); // 노출시간
    const [exposureB, setExposureB] = useState(""); // 장노출시간
    const [iso, setIso] = useState(""); // ISO
    const [whiteBalance, setWhiteBalance] = useState(""); // 화이트밸런스
    const [focalMm, setFocalMm] = useState(""); // 초점거리
    const [notes, setNotes] = useState(""); // 2x(망원) 추천 등등

    const { data: phoneData, refetch: refetchPhoneData } = useQuery({
        queryKey: ['getphonedata', phoneId],
        queryFn: () => getCameraSetting(phoneId),
        enabled: phoneId !== 0 && phoneId !== undefined
    });
    useEffect(() => {
        if (PhoneModel && phoneId && phoneId !== 0) {
            refetchPhoneData();
        }
    }, [PhoneModel, phoneId]);
    useEffect(() => {
        if (phoneData) {
            console.log("phoneData:", phoneData);
            setPhoneModel(phoneData.model);
            setApertureF(phoneData.apertureF);
            setExposureS(phoneData.exposureS);
            setExposureB(phoneData.exposureB);
            setIso(phoneData.iso);
            setWhiteBalance(phoneData.whiteBalance);
            setFocalMm(phoneData.focalMm);
            setNotes(phoneData.notes);
        }
    }, [phoneData]);

    return (
        <Flex
            w="80vw"
            justify="center"
            align="center"
        >
            <Flex
                w="800px"
                p="20px"

                direction={isMobile ? "column" : "row"}
                alignItems="center"
            >
                <Box
                    float="left"
                >
                    <Image
                        src={phoneImage}
                        alt="Phone Frame"
                        h={isMobile ? "200px" : "503px"}
                    />
                </Box>
                <Box
                    py="20px"
                    w="100%"
                >
                    <Text fontSize="40px" marginLeft="20px">{PhoneModel}</Text>
                    <Text fontSize="20px" marginLeft="20px">BEST SHOT</Text>
                    <Flex
                    w={{ base: 'auto', md: '400px' }} 
                        h="250px"
                        background
                        overflowY="scroll">
                        <Box
                        >
                            <Text whiteSpace="pre-wrap" margin="20px">
                                "밤하늘을 수놓은 아름다운 별자리<br />
                                더 이상 전문가의 전유물이 아닙니다!<br />
                                이제 여러분의 손안에 있는 {PhoneModel}으로도 충분히 <br />
                                밤하늘의 감동을 담아낼 수 있습니다.
                                <br />
                                <br />
                                {PhoneModel} 모델은 대부분의 은하수촬영이 가능합니다! <br />
                                감도(iso):{iso}, 조리개 값:{apertureF}, 초점거리:{focalMm}, 노출 시간{exposureS}, 노출 보정:{exposureB} 일때 최적의 은하수 사진을 촬영 할 수 있습니다
                                <br />
                                <br />
                                {PhoneModel} 모델은 대부분의 별자리촬영이 가능합니다! <br />
                                감도(iso):{iso}, 조리개 값:{apertureF}, 초점거리:{focalMm}, 노출 시간{exposureS}, 노출 보정:{exposureB} 일때 최적의 별자리 사진을 촬영 할 수 있습니다
                                <br />
                                <br />
                               
                            </Text>
                        </Box>

                    </Flex>

                </Box>
            </Flex>
        </Flex>
    );
}