import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import Main from './pages/Main.jsx';
import Loading from './pages/Loading.jsx'; // 혹은 ./pages/Loading

const queryClient = new QueryClient();

function App() {
    const [percent, setPercent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 0%에서 0.5초 대기 (0.5초 후 90%까지 2초간 이동)
        if (percent === 0 && isLoading) {
            const wait = setTimeout(() => setPercent(1), 1500);
            return () => clearTimeout(wait);
        }

        // 0%에서 90%까지 2초(2000ms) : step 계산
        if (percent > 0 && percent < 90 && isLoading) {
            // 2초 동안 1~90까지 89 step,
            // 각각 약 2000ms / 89 = ~22.5ms 씩 증가
            const step = 1; // 1씩 증가
            const interval = setInterval(() => {
                setPercent((prev) => {
                    const next = prev + step;
                    return next >= 90 ? 90 : next;
                });
            }, 22); // (약 22~23ms마다 1씩 증가)
            return () => clearInterval(interval);
        }

        // 90%에서 100%까지 0.8초(800ms) : step 계산
        // 90~100%까지 0.8초(800ms)
        if (percent >= 90 && percent < 100 && isLoading) {
            const interval = setInterval(() => {
                setPercent((prev) => {
                    const next = prev + 1;
                    return next >= 100 ? 100 : next;
                });
            }, 80);
            return () => clearInterval(interval);
        }

        // 완료 시 메인으로 전환
        if (percent === 100 && isLoading) {
            const timeout = setTimeout(() => setIsLoading(false), 600); // 연출용 delay
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    return isLoading ? <Loading percent={percent} /> : <Main />;
}
// React 18 이상에서는 이렇게 설정
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <App />
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
