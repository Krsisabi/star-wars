import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/tests/setup';

import { ErrorBoundary } from './ErrorBoundary';

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
      <ErrorBoundary fallback={<p>Fallback</p>}>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary fallback={<p>Fallback</p>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback')).toBeInTheDocument();
  });

  it('renders children again once resetKey changes', () => {
    let shouldThrow = true;
    const MaybeThrow = () => {
      if (shouldThrow) throw new Error('Test error');
      return <div>Recovered</div>;
    };

    const { rerender } = render(
      <ErrorBoundary fallback={<p>Fallback</p>} resetKey="first">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText('Fallback')).toBeInTheDocument();

    shouldThrow = false;
    rerender(
      <ErrorBoundary fallback={<p>Fallback</p>} resetKey="first">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.getByText('Fallback')).toBeInTheDocument();

    rerender(
      <ErrorBoundary fallback={<p>Fallback</p>} resetKey="second">
        <MaybeThrow />
      </ErrorBoundary>
    );
    expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });
});
