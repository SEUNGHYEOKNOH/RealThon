import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/ui/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

import Aside from '../Aside/Aside';
import ChoicePhone from '@/components/ChoicePhone/ChoicePhone';
import SelectPhone from '@/components/SelectPhone/SelectPhone';
import ActivityMap from '@/components/ActivityMap/ActivityMap';
import Sky from '../Sky/Sky';
import { getAccountData } from '@/utils/Api';

export default function Main() {

        const handleSignIn = () => {
        navigate('/signin');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const [PhoneModel, setPhoneModel] = useState("");
    const [phoneId, setPhoneId] = useState(0);

    const [percent, setPercent] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 추가

    const navigate = useNavigate();

    const { data: accountdata } = useQuery({ 
        queryKey: ['account', "aaa"], 
        queryFn: () => getAccountData(), 
        enabled: true, 
        retry: 0, 
    }); 

    useEffect(() => { 
        console.log("accdata", accountdata);
        if (accountdata) { 
            setIsLoggedIn(true); 
        } 
    }, [accountdata]);


    useEffect(() => {
        if (!isLoading) return;
        if (percent === 0) {
            const wait = setTimeout(() => setPercent(1), 900);
            return () => clearTimeout(wait);
        }

        if (percent > 0 && percent < 45) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 30);
            return () => clearInterval(interval);
        }
        if (percent >= 45 && percent < 85) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 90)), 50);
            return () => clearInterval(interval);
        }
        if (percent >= 85 && percent < 100) {
            const interval = setInterval(() => setPercent((p) => Math.min(p + 1, 100)), 170);
            return () => clearInterval(interval);
        }
        if (percent === 100) {
            const timeout = setTimeout(() => setIsLoading(false), 650);
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    if (isLoading) return <Loading percent={percent} />;

    return (
        <div className={styles.mainWrapper}>
            {/* 배경 컴포넌트 */}
            <Sky />
            
            {/* ✨ 메인 콘텐츠를 별도의 레이어로 감싸기 */}
            <div className={styles.mainContent}>
                <Header isLoggedIn={isLoggedIn} onSignIn={handleSignIn} onLogout={handleLogout} />

                {/* 스크롤 스냅을 적용할 부모 컨테이너 */}
                <div className={styles.scrollContainer}>
                    {/* 각 스크롤 대상이 될 섹션 */}
                    <div className={styles.scrollSection}>
                        <div className={styles.sectionHero}></div>
                    </div>
                    <div className={styles.scrollSection}>
                        <Aside />
                    </div>
                    {/* ✨ 인라인 스타일 대신 CSS 클래스 사용 권장 */}
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`}>
                        <ChoicePhone 
                            setPhoneModel={setPhoneModel}
                            setPhoneId={setPhoneId}
                        />
                    </div>
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`}>
                        <SelectPhone
                            PhoneModel={PhoneModel}
                            phoneId={phoneId}
                        />
                    </div>
                    <div className={`${styles.scrollSection} ${styles.contentBackground}`}>
                        <ActivityMap />
                    </div>
                </div>
            </div>
        </div>
    );
}
