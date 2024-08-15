import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';
import { useTheme } from '~/hooks';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [clientTheme, setClientTheme] = useState<null | string>(null);

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  const isLight = clientTheme === 'light';

  useEffect(() => {
    if (clientTheme !== null) {
      document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    }
  }, [isLight, clientTheme]);

  const themeText = isLight ? 'Set Light Theme' : 'Set Dark Theme';

  if (clientTheme === null) {
    return null;
  }

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
