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
        if (isLoading && percent < 100) {
            const interval = setInterval(() => {
                setPercent((prev) => Math.min(prev + 1, 100));
            }, 30); // 로딩속도 조절
            return () => clearInterval(interval);
        }
        if (percent === 100 && isLoading) {
            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 600); // 살짝 delay 후 전환
            return () => clearTimeout(timeout);
        }
    }, [percent, isLoading]);

    // 로딩이면 Loading, 아니면 Main
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
