import React, { useState } from 'react';
import { Box, Flex, Text, Button, Icon, useBreakpointValue, VStack } from '@chakra-ui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import { LuX } from 'react-icons/lu';

function Header({ isLoggedIn, onSignIn, onLogout, goToSection, currentSectionIndex, isMenuOpen, setIsMenuOpen }) {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const menuColor = currentSectionIndex >= 2 ? "black" : "#e4eafa";

    const toggleMenu = () => {
        console.log("Toggle Menu Clicked");
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = (sectionIndex) => {
        goToSection(sectionIndex);
        if (isMobile) {
            setIsMenuOpen(false); // 모바일에서 링크 클릭 시 메뉴 닫기
        }
    };

    const menuItems = (
        <>
        <Button 
            color={menuColor}
            onClick={() => handleLinkClick(0)}
            variant="ghost" 
            bg="transparent"
            border="none"
            outline="none"
            _focus={{ outline: 'none' }}
            mr={{ base: 0, md: "3px" }}
        >
            홈
        </Button>
        <Button 
            color={menuColor} 
            onClick={() => handleLinkClick(2)} 
            variant="ghost"
            bg="transparent"
            border="none"
            outline="none"
            _focus={{ outline: 'none' }}
            mr={{ base: 0, md: "3px" }}
        >
            디바이스 선택
        </Button>
        <Button 
            color={menuColor} 
            onClick={() => handleLinkClick(3)} 
            variant="ghost"
            bg="transparent"
            border="none"
            outline="none"
            _focus={{ outline: 'none' }}
            mr={{ base: 0, md: "3px" }}
        >
            디바이스 정보
        </Button>
        <Button 
            color={menuColor} 
            onClick={() => handleLinkClick(4)} 
            variant="ghost"
            bg="transparent"
            border="none"
            outline="none"
            _focus={{ outline: 'none' }}
            mr={{ base: 0, md: "3px" }}
        >
            나의 천체지도
        </Button>
        {isLoggedIn ? (
            <Button
                color={menuColor}
                onClick={onLogout}
                variant="ghost"
                bg="transparent"
                border="none"
                outline="none"
                _focus={{ outline: 'none' }}
            >
                로그아웃
            </Button>
        ) : (
            <Button
                color={menuColor}
                onClick={onSignIn}
                variant="ghost"
                bg="transparent"
                border="none"
                outline="none"
                _focus={{ outline: 'none' }}
            >
                로그인
            </Button>
        )}
        </>
    );

    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="62px"
            bg="rgba(0, 0, 0, 0)"
            alignItems="center"
            justifyContent="space-between"
            zIndex={100}
            pl="26px"
            boxSizing="border-box"
            boxShadow="0 3px 10px rgba(18, 28, 50, 0.08)"
        >
        <Box>
            <Text
                fontSize="1.14rem"
                fontWeight="500"
                color={menuColor}
                letterSpacing="0.11rem"
                ml="14px"
                whiteSpace="nowrap"
                userSelect="none"
                textShadow="0 2px 10px rgba(16, 36, 95, 0.13)"
            >
                MEA MAPPA CAELESTIS
            </Text>
        </Box>

        {isMobile ? (
            // 모바일 햄버거 메뉴
            <Box pr="26px">
                <Button
                    onClick={toggleMenu}
                    bg="transparent"
                    border="none"
                    outline="none"
                    _focus={{ outline: 'none' }}
                >
                    <Icon
                        // variant="ghost"
                        bg="transparent"
                        // aria-label="Toggle Menu"
                        color={menuColor}
                    >
                        <RxHamburgerMenu size="24" />
                    </Icon>
                </Button>
                {/* Box를 사용하여 메뉴 오버레이 구현 */}
                <Box
                    display={isMenuOpen ? 'flex' : 'none'} // isMenuOpen 상태에 따라 보이기/숨기기
                    bg="rgba(255, 255, 255, 0.95)"
                    height="100vh"
                    width="100vw"
                    position="fixed"
                    top="0"
                    left="0"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    zIndex={90}
                    transition="opacity 0.2s ease-in-out" // 부드러운 전환 효과
                >
                    <VStack spacing={8} color="black">
                    <Button
                        color="#000"
                        bg="transparent"
                        fontSize="2xl"
                        onClick={() => handleLinkClick(0)}
                        border="none"
                        outline="none"
                        _focus={{ outline: 'none' }}
                    >
                        홈
                    </Button>
                    <Button
                        color="#000"
                        bg="transparent"
                        fontSize="2xl"
                        onClick={() => handleLinkClick(2)}
                        border="none"
                        outline="none"
                        _focus={{ outline: 'none' }}
                    >
                        디바이스 선택
                    </Button>
                    <Button
                        color="#000"
                        bg="transparent"
                        fontSize="2xl"
                        onClick={() => handleLinkClick(3)}
                        border="none"
                        outline="none"
                        _focus={{ outline: 'none' }}
                    >
                        디바이스 정보
                    </Button>
                    <Button
                        color="#000"
                        bg="transparent"
                        fontSize="2xl"
                        onClick={() => handleLinkClick(4)}
                        border="none"
                        outline="none"
                        _focus={{ outline: 'none' }}
                    >
                        나의 천체지도
                    </Button>
                    {isLoggedIn ? (
                        <Button
                            color="#000"
                            bg="transparent"
                            fontSize="2xl"
                            onClick={onLogout}
                            border="none"
                            outline="none"
                            _focus={{ outline: 'none' }}
                        >
                            로그아웃
                        </Button>
                    ) : (
                        <Button
                            color="#000"
                            bg="transparent"
                            fontSize="2xl"
                            onClick={onSignIn}
                            border="none"
                            outline="none"
                            _focus={{ outline: 'none' }}
                        >
                            로그인
                        </Button>
                    )}
                    </VStack>
                </Box>
            </Box>
        ) : (
            // 데스크톱 메뉴
            <Flex alignItems="center" pr="26px">
                {menuItems}
            </Flex>
        )}
        </Flex>
    );
}

export default Header;