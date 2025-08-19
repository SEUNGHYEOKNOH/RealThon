import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import GetPhoneImg from "@/utils/GetPhoneImg.jsx"
import { getCameraSetting } from "@/utils/Api.jsx";

export default function SelectPhone({ PhoneModel, phoneId }) {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const [phoneImage, setPhoneImage] = useState(GetPhoneImg(""));

    useEffect(() => {
        if (PhoneModel !== undefined && PhoneModel) {
            console.log("PhoneModel:", PhoneModel);
            setPhoneImage(GetPhoneImg(PhoneModel));
        }
    }, [PhoneModel]);


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
        enabled: true
    });
    useEffect(() => {
        if (PhoneModel && phoneId) {
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
            w="100vw"
            justify="center"
            align="center"
        >
            <Flex
                w="1200px"
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
                    <Text fontSize="40px">{PhoneModel}</Text>
                    <Text fontSize="20px">BEST SHOT</Text>
                    <Flex
                        h="350px"
                        border="1px solid black"
                        overflowY="scroll"
                    >
                        <Box>
                            <Text whiteSpace="pre-wrap">
                                설명<br />
                            </Text>
                        </Box>
                        <Box>
                            <Text whiteSpace="pre-wrap">
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}