import { useContext } from 'react';
import { ThemeContext } from '~/context/theme-context';

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme)
    throw new Error(
      'Error: useTheme context must be used within a ThemeContextProvider'
    );
  return theme;
}
