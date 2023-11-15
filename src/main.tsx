import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Error } from './pages/Error/index.ts';
import { SearchProvider } from './hooks/useSearch.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <BrowserRouter>
        <SearchProvider>
          <App />
        </SearchProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
