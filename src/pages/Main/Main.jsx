import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
// import Loading from '@/components/ui/Loading/Loading';
import styles from './Main.module.css';

import ChoicePhone from '@/components/ChoicePhone/ChoicePhone';
import SelectPhone from '@/components/SelectPhone/SelectPhone';
import ActivityMap from '@/components/ActivityMap/ActivityMap';

// 새로 추가
import Sky from '../Sky/Sky';

export default function Main() {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    /*
  useEffect(() => {
    if (!isLoading) return;
    if (percent === 0) {
      const wait = setTimeout(() => setPercent(1), 900);
      return () => clearTimeout(wait);
    }
    if (percent > 0 && percent < 55) {
      const interval = setInterval(() => setPercent(p => Math.min(p + 1, 90)), 120);
      return () => clearInterval(interval);
    }
    if (percent >= 55 && percent < 85) {
      const interval = setInterval(() => setPercent(p => Math.min(p + 1, 90)), 90);
      return () => clearInterval(interval);
    }
    if (percent >= 85 && percent < 100) {
      const interval = setInterval(() => setPercent(p => Math.min(p + 1, 100)), 170);
      return () => clearInterval(interval);
    }
    if (percent === 100) {
      const timeout = setTimeout(() => setIsLoading(false), 550);
      return () => clearTimeout(timeout);
    }
  }, [percent, isLoading]);

  if (isLoading) return <Loading percent={percent} />;
*/
    return (
        <div className={styles.mainWrapper}>
            {/* 하늘/별/구름 전체를 배경으로 깔기 */}
            <Sky />

            <Header />
            <div className={styles.sectionHero}></div>

            <div style={{ width: '100%', height: '100vh', background: '#0b1220' }} />
            <div style={{ width: '100%', height: '100vh', background: '#101826' }} />

            <ChoicePhone />
            <SelectPhone />
            <ActivityMap />
        </div>
    );
}
