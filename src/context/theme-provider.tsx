import type { ReactNode } from 'react';
import React, { useLayoutEffect } from 'react';

import { STORAGE_KEYS, useLocalStorage } from '~/hooks/useLocalStorage';

import type { Theme } from './theme-context';
import { ThemeContext } from './theme-context';

// Without a saved choice the page follows the system setting.
// index.html repeats this before the first paint, so there is no flash.
const systemTheme = (): Theme =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    STORAGE_KEYS.theme,
    systemTheme()
  );

  // The provider, not the switcher, owns the attribute: pages without
  // the switcher (404, the error screen) get the theme too.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
