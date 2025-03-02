import { render, screen } from '~/test/render';

import { ErrorBoundary } from './ErrorBoundary';

function ThrowError(): never {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('shows its children while nothing throws', () => {
    render(
      <ErrorBoundary fallback={<p>Fallback</p>}>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('shows the fallback once a child throws', () => {
    render(
      <ErrorBoundary fallback={<p>Fallback</p>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Fallback')).toBeInTheDocument();
  });

  it('shows the children again once the reset key changes', () => {
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
