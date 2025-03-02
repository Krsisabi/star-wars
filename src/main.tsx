import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { RouteErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/theme-provider.tsx';
import { store } from './store';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </RouteErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
