import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '~/hooks';

type Theme = 'light' | 'dark';

type ThemeContext = {
  theme: Theme;
  setTheme: (arg: React.SetStateAction<Theme>) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { value: theme, setValue: setTheme } = useLocalStorage<Theme>(
    'theme',
    'light'
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
