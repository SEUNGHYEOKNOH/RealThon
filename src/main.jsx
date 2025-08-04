import { StrictMode } from 'react'
import { Provider } from "@/components/ui/provider"
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'

import Main from './App.jsx'

// React Query 클라이언트 생성
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
