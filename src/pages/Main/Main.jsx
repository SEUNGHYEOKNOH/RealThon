import React, { useState } from 'react';
import Header from '../Header/Header';
import styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

import Aside from '../Aside/Aside';
import ChoicePhone from '@/components/ChoicePhone/ChoicePhone';
import SelectPhone from '@/components/SelectPhone/SelectPhone';
import ActivityMap from '@/components/ActivityMap/ActivityMap';
import Sky from '../Sky/Sky';

export default function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className={styles.mainWrapper}>
            <Sky />
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
                <div className={styles.scrollSection} style={{ backgroundColor: '#f4f4f4de' }}>
                    <ChoicePhone />
                </div>
                <div className={styles.scrollSection} style={{ backgroundColor: '#f4f4f4de' }}>
                    <SelectPhone />
                </div>
                <div className={styles.scrollSection} style={{ backgroundColor: '#f4f4f4de' }}>
                    <ActivityMap />
                </div>
            </div>
        </div>
    );
}
