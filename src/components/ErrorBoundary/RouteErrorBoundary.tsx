import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { ErrorBoundary } from './ErrorBoundary';

type RouteErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

// The fallback gives way to the page again once the address changes.
export function RouteErrorBoundary({
  fallback,
  children,
}: RouteErrorBoundaryProps) {
  const location = useLocation();

  return (
    <ErrorBoundary fallback={fallback} resetKey={location.key}>
      {children}
    </ErrorBoundary>
  );
}
