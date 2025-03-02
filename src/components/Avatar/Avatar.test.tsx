import { fireEvent, render } from '~/test/render';

import { Avatar } from './Avatar';

const portraitIn = (container: HTMLElement) => container.querySelector('img');
const circleIn = (container: HTMLElement) => container.firstElementChild;

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
    expect(circleIn(container)).not.toHaveAttribute('data-loading');
  });

  it('shows a skeleton while a portrait not in the cache loads', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    expect(portraitIn(container)).not.toHaveAttribute('data-loaded');
    expect(circleIn(container)).toHaveAttribute('data-loading');
    fireEvent.load(portraitIn(container)!);
    expect(portraitIn(container)).toHaveAttribute('data-loaded');
    expect(circleIn(container)).not.toHaveAttribute('data-loading');
  });

  it('falls back to the monogram when the portrait does not load', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    fireEvent.error(portraitIn(container)!);

    expect(portraitIn(container)).toBeNull();
    expect(container).toHaveTextContent('LS');
    expect(circleIn(container)).not.toHaveAttribute('data-loading');
  });

  it('keeps the referrer that Fandom asks of a portrait request', () => {
    const { container } = render(<Avatar id={1} name="Luke Skywalker" />);

    expect(portraitIn(container)).not.toHaveAttribute('referrerpolicy');
  });

  it('waits as a skeleton until the character is known', () => {
    const { container } = render(<Avatar id={1} />);

    expect(portraitIn(container)).toBeNull();
    expect(circleIn(container)).toBeEmptyDOMElement();
    expect(circleIn(container)).toHaveAttribute('data-loading');
  });

  it('shows only the monogram for a character without a portrait', () => {
    const { container } = render(<Avatar id={9999} name="Nobody" />);

    expect(portraitIn(container)).toBeNull();
    expect(container).toHaveTextContent('NO');
    expect(circleIn(container)).not.toHaveAttribute('data-loading');
  });
});
