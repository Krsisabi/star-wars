import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';

import { initials, toneStyle } from '~/utils/character';
import { portraitOf } from '~/utils/portraits';

import styles from './Avatar.module.scss';

type AvatarProps = {
  id: number;
  name?: string;
  size?: 'medium' | 'large';
  className?: string;
};

const PORTRAIT_WIDTH = 240;

export function Avatar({ id, name, size = 'medium', className }: AvatarProps) {
  const src = portraitOf(id, PORTRAIT_WIDTH);
  const [loaded, setLoaded] = useState<string>();
  const [failed, setFailed] = useState<string>();
  const portraitRef = useRef<HTMLImageElement>(null);
  const known = name !== undefined;
  const hasPortrait = known && Boolean(src) && src !== failed;
  const loading = !known || (hasPortrait && src !== loaded);

  useLayoutEffect(() => {
    const portrait = portraitRef.current;
    if (portrait?.complete && portrait.naturalWidth) setLoaded(src);
  }, [src]);

  return (
    <span
      className={clsx(styles.avatar, styles[size], className)}
      style={toneStyle(id)}
      data-loading={loading || undefined}
      aria-hidden="true"
    >
      {hasPortrait ? (
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
        known && initials(name)
      )}
    </span>
  );
}
