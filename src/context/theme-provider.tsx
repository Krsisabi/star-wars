import React, { ReactNode } from 'react';
import { useLocalStorage } from '~/hooks';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { ThemeContext } from './theme-context';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage<ThemeContext['theme']>(
    STORAGE_KEYS.theme,
    'light'
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
