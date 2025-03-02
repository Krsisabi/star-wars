import { fireEvent, render } from '@testing-library/react';
import { Avatar } from './Avatar';

const portraitIn = (container: HTMLElement) => container.querySelector('img');

describe('Avatar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a portrait of the right size, and no monogram under it', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    expect(container).not.toHaveTextContent('LS');
    expect(portraitIn(container)?.getAttribute('src')).toMatch(
      /scale-to-width-down\/240/
    );
  });

  it('shows a portrait from the cache at once, without waiting for load', () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(
      true
    );
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(
      240
    );

    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    expect(portraitIn(container)).toHaveAttribute('data-loaded');
  });

  it('waits for a portrait that is not in the cache', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    expect(portraitIn(container)).not.toHaveAttribute('data-loaded');
    fireEvent.load(portraitIn(container)!);
    expect(portraitIn(container)).toHaveAttribute('data-loaded');
  });

  it('falls back to the monogram when the portrait does not load', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    fireEvent.error(portraitIn(container)!);

    expect(portraitIn(container)).toBeNull();
    expect(container).toHaveTextContent('LS');
  });

  it('shows only the monogram for a character without a portrait', () => {
    const { container } = render(<Avatar id={9999} name="Nobody" />);

    expect(portraitIn(container)).toBeNull();
    expect(container).toHaveTextContent('NO');
  });
});
