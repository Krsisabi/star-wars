import { trackPointerLight } from './pointerLight';

const fakePointerEvent = (
  type: string,
  x: number,
  y: number,
  pointerType = 'mouse'
) =>
  Object.assign(new MouseEvent(type, { clientX: x, clientY: y }), {
    pointerType,
  });

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

describe('trackPointerLight', () => {
  const root = document.documentElement;
  let stop: () => void;

  beforeEach(() => {
    stop = trackPointerLight(root);
  });

  afterEach(() => stop());

  it('puts the mouse position on the root, once a frame', async () => {
    document.dispatchEvent(fakePointerEvent('pointermove', 10, 20));
    document.dispatchEvent(fakePointerEvent('pointermove', 30, 40));
    expect(root.style.getPropertyValue('--mx')).toBe('');

    await nextFrame();
    expect(root.style.getPropertyValue('--mx')).toBe('30px');
    expect(root.style.getPropertyValue('--my')).toBe('40px');
  });

  it('ignores touch', async () => {
    document.dispatchEvent(fakePointerEvent('pointermove', 10, 20, 'touch'));
    await nextFrame();
    expect(root.style.getPropertyValue('--mx')).toBe('');
  });

  it('takes the position away when the mouse leaves the page', async () => {
    document.dispatchEvent(fakePointerEvent('pointermove', 10, 20));
    await nextFrame();
    root.dispatchEvent(new MouseEvent('pointerleave'));
    expect(root.style.getPropertyValue('--mx')).toBe('');
    expect(root.style.getPropertyValue('--my')).toBe('');
  });
});
