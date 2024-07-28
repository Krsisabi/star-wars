import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Error } from './components/Error';
import { store } from './store';
import { ThemeProvider } from './context/theme.tsx';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<Error />}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
