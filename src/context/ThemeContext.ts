import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark';

export const otherTheme = (theme: Theme): Theme =>
  theme === 'light' ? 'dark' : 'light';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
