import '~/styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RouteErrorBoundary } from '~/components/ErrorBoundary';
import { ThemeProvider } from '~/context/theme-provider';
import { store } from '~/store/store';
import { trackPointerLight } from '~/utils/pointer-light';

import App from './App';

trackPointerLight();

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
