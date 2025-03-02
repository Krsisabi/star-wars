import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import type { AppStore } from '~/store/store';

type ProvidersProps = {
  store: AppStore;
  children: ReactNode;
};

export function Providers({ store, children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}
