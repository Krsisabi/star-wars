import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './Icon.module.scss';

// Line icons on a 24×24 grid, drawn with the text's colour.
const SHAPES = {
  // A drawn cross: the × glyph sits wherever the font puts it.
  cross: <path d="M7 7l10 10M17 7 7 17" />,
  download: (
    <path d="M12 3v12M7 10l5 5 5-5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 20 20" />
    </>
  ),
  warning: (
    <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof SHAPES;

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={clsx(styles.icon, className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {SHAPES[name]}
    </svg>
  );
}
