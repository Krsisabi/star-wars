// Where the mouse is, for the frosted glass: the rims light up around it
// (the frost mixin in styles/_mixins.scss). One pair of variables on the
// root, in viewport coordinates, rather than one per element: the
// gradients that read them are fixed to the viewport. Written once a
// frame at most, and taken away when the mouse leaves the page. A finger
// has no hover to light anything with, so touch is ignored.
export const trackPointerLight = (root = document.documentElement) => {
  let frame = 0;
  let x = 0;
  let y = 0;

  const move = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    x = event.clientX;
    y = event.clientY;
    frame ||= requestAnimationFrame(() => {
      frame = 0;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
    });
  };

  const leave = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    root.style.removeProperty('--mx');
    root.style.removeProperty('--my');
  };

  document.addEventListener('pointermove', move, { passive: true });
  root.addEventListener('pointerleave', leave);

  return () => {
    leave();
    document.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', leave);
  };
};
