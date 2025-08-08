import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

import Main from './pages/Main.jsx';
import Loading from './pages/Loading/Loading'; // 인트로 컴포넌트 import

const queryClient = new QueryClient();

function AppWithIntro() {
    // 인트로(로딩) 상태 관리
    const [percent, setPercent] = useState(0);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        if (showIntro) {
            // percent가 100%까지 증가 (속도/타이밍 조정 가능)
            if (percent < 100) {
                const timer = setTimeout(() => setPercent(percent + 1), 20);
                return () => clearTimeout(timer);
            } else {
                // 잠깐의 추가 지연 후 인트로 종료
                setTimeout(() => setShowIntro(false), 500);
            }
        }
    }, [percent, showIntro]);

    if (showIntro) {
        return <Loading percent={percent} />;
    }

    // 인트로가 끝나면 정상 라우팅 UI 렌더
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                {/* 추후 페이지 추가 가능 */}
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <AppWithIntro />
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
