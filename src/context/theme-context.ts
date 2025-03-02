import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContext = {
  theme: Theme;
  setTheme: (arg: React.SetStateAction<Theme>) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);
