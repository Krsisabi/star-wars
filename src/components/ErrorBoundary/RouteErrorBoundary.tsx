import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { Error } from '~/components/Error';

import { ErrorBoundary } from './ErrorBoundary';

export const RouteErrorBoundary = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <ErrorBoundary fallback={<Error />} resetKey={location.key}>
      {children}
    </ErrorBoundary>
  );
};
