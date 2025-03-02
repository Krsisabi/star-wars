import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { RouteErrorBoundary } from '~/components/ErrorBoundary';
import { ThemeProvider } from '~/context/ThemeProvider';
import { ErrorPage } from '~/pages/ErrorPage';
import type { AppStore } from '~/store/store';

type AppProvidersProps = {
  store: AppStore;
  children: ReactNode;
};

// Everything the app runs inside but the router: the browser's in the
// app, one in memory in tests.
export function AppProviders({ store, children }: AppProvidersProps) {
  return (
    <RouteErrorBoundary fallback={<ErrorPage />}>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </RouteErrorBoundary>
  );
}
