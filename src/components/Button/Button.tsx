import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import type { IconName } from '~/components/Icon';
import { Icon } from '~/components/Icon';

import styles from './Button.module.scss';

type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  icon: IconName;
  label: string;
  // A round button with the icon alone; otherwise the label shows, and
  // the icon takes its place only on a phone.
  iconOnly?: boolean;
  tone?: 'danger';
};

// A button on the glass: no body of its own until hovered. The label
// stays for screen readers wherever only the icon shows.
export function Button({
  icon,
  label,
  iconOnly = false,
  tone,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        iconOnly ? styles.round : styles.text,
        tone && styles[tone],
        className
      )}
      {...props}
    >
      <Icon name={icon} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
