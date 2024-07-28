import { useEffect } from 'react';

import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '~/hooks';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === 'light';
  useEffect(() => {
    document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
  }, [isLight]);

  const themeText = isLight ? 'Set Light Theme' : 'Set Dark Theme';

  return (
    <button
      className={styles.switcher}
      onClick={() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      }}
    >
      {themeText}
    </button>
  );
};
