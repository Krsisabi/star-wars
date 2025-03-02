import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import type { IconName } from '~/components/Icon';
import { Icon } from '~/components/Icon';

import styles from './Button.module.scss';

type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  icon: IconName;
  label: string;
  iconOnly?: boolean;
  tone?: 'danger';
};

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
