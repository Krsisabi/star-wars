import clsx from 'clsx';
import { hueOf, initials } from '~/utils/character';
import styles from './Avatar.module.scss';

type AvatarProps = {
  id: number;
  name: string;
  size?: 'medium' | 'large';
  className?: string;
};

// SWAPI has no pictures, so every character gets a monogram in a tint
// of its own: neighbouring cards never share a colour.
export function Avatar({ id, name, size = 'medium', className }: AvatarProps) {
  return (
    <span
      className={clsx(styles.avatar, styles[size], className)}
      style={{ '--hue': hueOf(id) } as React.CSSProperties}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
