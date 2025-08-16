import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from '@/components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

import Main from './pages/Main/Main.jsx';
// import OtherPage from './pages/OtherPage.jsx';  // 주석처리 하세요! 파일이 없으면
import ActivityMap from './components/ActivityMap/ActivityMap.jsx'; // for test

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />

                        {/* <Route path="/other" element={<OtherPage />} /> */}
                        {/* OtherPage.jsx가 없으면 반드시 주석 또는 삭제 */}
                        {/* for test */}
                        <Route path="/activitymap" element={<ActivityMap />} />
                    </Routes>
                </Router>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
