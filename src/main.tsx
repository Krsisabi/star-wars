import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Error } from './components/Error';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
