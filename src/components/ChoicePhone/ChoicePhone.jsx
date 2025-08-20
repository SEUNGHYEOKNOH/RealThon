import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Input, Image } from '@chakra-ui/react';

import Phone from './Phone.jsx';
import { getDeviceList } from "@/utils/Api.jsx";
import GetPhoneImg from "@/utils/GetPhoneImg.jsx";

import SearchCircle from '@/assets/SearchCircle.svg';

export default function ChoicePhone({ setPhoneModel, setPhoneId, goToSection }) {
    const [deviceList, setDeviceList] = useState([]);
    // 1. 검색어를 저장하기 위한 state 추가
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDeviceList = async () => {
            const devices = await getDeviceList();
            setDeviceList(devices.models);
        };
        fetchDeviceList();
    }, []);

    // 2. 검색어(searchTerm)를 기반으로 deviceList를 필터링
    // model 이름에 검색어가 포함된 항목만 필터링 (대소문자 구분 없음)
    const filteredDevices = deviceList.filter(device =>
        device.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Flex direction="column" justify="center" w="100vw" h="100vh">
            <Flex justify="center" w="100%">
                <Text fontSize="30px" marginTop="50px">SELECT DEVICE</Text>
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
                        placeholder="Search device model..." // 사용자 편의를 위한 placeholder 추가
                        // 3. Input의 값과 onChange 이벤트 핸들러 연결
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>

            <Box mt="70px" w="100%" h="400px" overflowX="scroll" whiteSpace="nowrap" overflowY="hidden">
                {/* 4. 기존 deviceList 대신 필터링된 filteredDevices를 map으로 렌더링 */}
                {filteredDevices.map((phone, index) => (
                    <Phone
                        key={phone.id} // index보다 고유한 id를 key로 사용하는 것이 더 좋습니다.
                        phoneModelName={phone.model}
                        imageSrc={GetPhoneImg({ phoneModel: phone.model })}
                        setPhoneModel={setPhoneModel}
                        phoneId={phone.id}
                        setPhoneId={setPhoneId} // setPhoneId를 Phone 컴포넌트에 전달
                        goToSection={goToSection}
                    />
                ))}
            </Box>
        </Flex>
    );
}