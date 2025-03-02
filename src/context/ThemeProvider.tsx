import type { ReactNode } from 'react';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { STORAGE_KEYS, writeStored } from '~/utils/storage';

import type { Theme } from './ThemeContext';
import { isTheme, otherTheme, ThemeContext } from './ThemeContext';

const pageTheme = (): Theme => {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : 'light';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(pageTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = otherTheme(theme);
    writeStored(STORAGE_KEYS.theme, next);
    setTheme(next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
