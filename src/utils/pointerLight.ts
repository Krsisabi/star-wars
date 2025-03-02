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
