import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/setup';
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

  it('renders children again once resetKey changes', () => {
    let shouldThrow = true;
    const MaybeThrow = () => {
      if (shouldThrow) throw new Error('Test error');
      return <div>Recovered</div>;
    };

    const { rerender } = render(
      <ErrorBoundary fallback={<ErrorElement />} resetKey="first">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('error-page')).toBeInTheDocument();

    shouldThrow = false;
    rerender(
      <ErrorBoundary fallback={<ErrorElement />} resetKey="first">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('error-page')).toBeInTheDocument();

    rerender(
      <ErrorBoundary fallback={<ErrorElement />} resetKey="second">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.queryByTestId('error-page')).not.toBeInTheDocument();
    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });
});
