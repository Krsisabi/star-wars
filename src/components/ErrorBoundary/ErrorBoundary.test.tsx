import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Error as ErrorElement } from '../Error/Error';

const ThrowError: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders children without error', () => {
    render(
      <ErrorBoundary fallback={<ErrorElement />}>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary fallback={<ErrorElement />}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
