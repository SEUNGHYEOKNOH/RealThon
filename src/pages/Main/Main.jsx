import React, { useState, useEffect, useRef } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/ui/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

import styles from './Main.module.css';

import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import ChoicePhone from '@/components/ChoicePhone/ChoicePhone';
import SelectPhone from '@/components/SelectPhone/SelectPhone';
import ActivityMap from '@/components/ActivityMap/ActivityMap';
import Sky from '../Sky/Sky';
import { getAccountData, postLogout } from '@/utils/Api';

export default function Main() {
    const scrollContainerRef = useRef(null);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        setIsMenuOpen(false);
    }, [isMobile]);

    // 각 섹션에 대한 ref 배열 생성
    const sectionRefs = useRef([]);
    // 각 섹션의 개수에 맞게 ref 배열 초기화
    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, 5);
    }, []);

    const handleSignIn = () => {
        navigate('/signin');
    };
    const handleLogout = () => {
        postLogout();
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        navigate('/');
    };
    const [PhoneModel, setPhoneModel] = useState("");
    const [phoneId, setPhoneId] = useState(0);
    const [percent, setPercent] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { data: accountdata, error: accountError } = useQuery({
        queryKey: ['account', "aaa"],
        queryFn: () => getAccountData(),
        enabled: true,
        retry: 0,
    });

    useEffect(() => {
        if (accountdata) {
            setIsLoggedIn(true);
        }
        if (accountError) {
            setIsLoggedIn(false);
        }
    }, [accountdata, accountError]);

    // 스크롤 이벤트 리스너
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                // 각 섹션의 높이가 100vh이므로 현재 스크롤 위치를 윈도우 높이로 나눕니다.
                const newIndex = Math.floor(scrollContainerRef.current.scrollTop / window.innerHeight);
                setCurrentSectionIndex(newIndex);
            }
        };

        const currentElement = scrollContainerRef.current;
        if (currentElement) {
            currentElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentElement) {
                currentElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    console.log(`현재 위치한 섹션의 인덱스: ${currentSectionIndex}`);

    // 특정 섹션으로 부드럽게 스크롤하는 함수
    const goToSection = (index) => {
        if (sectionRefs.current[index]) {
            sectionRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        if (!isLoading) return;
        if (percent === 0) {
            const wait = setTimeout(() => setPercent(1), 900);
            return () => clearTimeout(wait);
        }

        if (percent > 0 && percent < 45) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 20);
            return () => clearInterval(interval);
        }
        if (percent >= 45 && percent < 85) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 40);
            return () => clearInterval(interval);
        }
        if (percent >= 85 && percent < 100) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 100)), 50);
            return () => clearInterval(interval);
        }
        if (percent === 100) {
            const timeout = setTimeout(() => setIsLoading(false), 450);
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    return (
        <div className={styles.mainWrapper}>
            {isLoading && <Loading percent={percent} />}
            <Sky currentSectionIndex={currentSectionIndex} isMenuOpen={isMenuOpen} />
            <div className={styles.mainContent} ref={scrollContainerRef}>
                <Header isLoggedIn={isLoggedIn} onSignIn={handleSignIn} onLogout={handleLogout} currentSectionIndex={currentSectionIndex} goToSection={goToSection} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <div className={styles.scrollContainer}>
                    <div className={styles.scrollSection} ref={(el) => (sectionRefs.current[0] = el)}>
                        <div className={styles.sectionHero}></div>
                    </div>
                    <div className={styles.scrollSection} ref={(el) => (sectionRefs.current[1] = el)}>
                        <Aside />
                    </div>
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`} ref={(el) => (sectionRefs.current[2] = el)}>
                        <ChoicePhone setPhoneModel={setPhoneModel} setPhoneId={setPhoneId} goToSection={goToSection} />
                    </div>
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`} ref={(el) => (sectionRefs.current[3] = el)}>
                        <SelectPhone PhoneModel={PhoneModel} phoneId={phoneId} />
                    </div>
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`} ref={(el) => (sectionRefs.current[4] = el)}>
                        <ActivityMap isLoggedIn={isLoggedIn} />
                    </div>
                </div>
            </div>
        </div>
    );
}