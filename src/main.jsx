// src/main.jsx
// - 요구: 전역 폰트(index.css) 한 번만 임포트, 라우팅/리액트쿼리/Provider 포함 최종 코드
// - 주의: 존재하지 않는 페이지(OtherPage 등)는 라우터에서 제거 또는 주석 처리

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from '@/components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 전역 스타일 및 폰트(여기서 한 번만 임포트)
import './index.css';

// 페이지 컴포넌트
import Main from './pages/Main/Main.jsx';

// import OtherPage from './pages/OtherPage.jsx';  // 주석처리 하세요! 파일이 없으면
import ActivityMap from './components/ActivityMap/ActivityMap.jsx'; // for test
import Login from './pages/Signin/Signin.jsx'; // for test
import MyActivityMap from './components/MyActivityMap/MyActivityMap.jsx'; // for test
import ChoicePhone from './components/ChoicePhone/ChoicePhone';
import SelectPhone from './components/SelectPhone/SelectPhone.jsx'; // for test

// 리액트 쿼리 클라이언트 생성
const queryClient = new QueryClient();

// 애플리케이션 부트스트랩
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            {/* UI 전역 Provider (테마/모달/토스트 등) */}
            <Provider>
                {/* 라우터 구성 */}
                <Router>
                    <Routes>
                        {/* 메인 페이지 라우트 */}
                        <Route path="/" element={<Main />} />

                        {/* 다른 라우트는 파일 생성 전까지 주석 처리 */}
                        {/* <Route path="/other" element={<OtherPage />} /> */}

                        {/* OtherPage.jsx가 없으면 반드시 주석 또는 삭제 */}
                        {/* for test */}
                        <Route path="/activitymap" element={<ActivityMap />} />
                        <Route path="/choicephone" element={<ChoicePhone />} />
                        <Route path="/selectphone" element={<SelectPhone />} />
                        <Route path="/signin" element={<Login />} />
                        <Route path="/myactivitymap" element={<MyActivityMap />} />
                        
                    </Routes>
                </Router>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
