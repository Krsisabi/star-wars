import '~/styles/index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { makeStore } from '~/store/store';
import { trackPointerLight } from '~/utils/pointerLight';

import { App } from './App';
import { AppProviders } from './AppProviders';

const store = makeStore();

trackPointerLight();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders store={store}>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);
