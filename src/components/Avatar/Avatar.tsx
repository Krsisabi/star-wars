import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { hueOf, initials } from '~/utils/character';
import { portraitOf } from '~/utils/portraits';
import styles from './Avatar.module.scss';

type AvatarProps = {
  id: number;
  name: string;
  size?: 'medium' | 'large';
  className?: string;
};

// Twice the size on screen or close to it, for sharp pictures on dense
// displays: a full card shows the portrait at up to 128px, the panel at 96.
const PICTURE_WIDTH = { medium: 240, large: 240 };

// A portrait on a circle in a tint of the character's own; while it loads,
// the circle stays empty. A monogram only stands in for a picture that is
// missing or never loads: laid under one, it showed through the cut-outs
// around the figure.
export function Avatar({ id, name, size = 'medium', className }: AvatarProps) {
  const src = portraitOf(id, PICTURE_WIDTH[size]);
  const [loaded, setLoaded] = useState<string>();
  const [failed, setFailed] = useState<string>();
  const portraitRef = useRef<HTMLImageElement>(null);

  // A picture already in the browser's cache is complete the moment its
  // element is made. It is shown before the first paint, with no fade:
  // waiting for the load event left the circle empty for a moment each
  // time a card or the panel opened again.
  useLayoutEffect(() => {
    const portrait = portraitRef.current;
    if (portrait?.complete && portrait.naturalWidth) setLoaded(src);
  }, [src]);

  return (
    <span
      className={clsx(styles.avatar, styles[size], className)}
      style={{ '--hue': hueOf(id) } as React.CSSProperties}
      aria-hidden="true"
    >
      {src && src !== failed ? (
        <img
          ref={portraitRef}
          className={styles.portrait}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          data-loaded={src === loaded || undefined}
          onLoad={() => setLoaded(src)}
          onError={() => setFailed(src)}
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
