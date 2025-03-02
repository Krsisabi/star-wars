import type { ReactNode } from 'react';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { STORAGE_KEYS, writeStored } from '~/utils/storage';

import type { Theme } from './ThemeContext';
import { isTheme, otherTheme, ThemeContext } from './ThemeContext';

// The script in index.html themes the page before the first paint: the
// saved choice, or else the system's. The provider starts from what that
// script chose, so the two never disagree.
const pageTheme = (): Theme => {
  const theme = document.documentElement.dataset.theme;
  return isTheme(theme) ? theme : 'light';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(pageTheme);

  // The provider, not the switcher, owns the attribute: pages without
  // the switcher (404, the error screen) get the theme too.
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
