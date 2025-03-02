import { render } from '@testing-library/react';

import { STORAGE_KEYS } from '~/hooks/useLocalStorage';

import { ThemeProvider } from './theme-provider';

const prefersDark = (matches: boolean) =>
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches }))
  );

describe('ThemeProvider', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
    delete document.documentElement.dataset.theme;
  });

  it('themes a page that has no switcher on it', () => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <h1>404 Not Found</h1>
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('follows the system when nothing is saved', () => {
    prefersDark(true);

    render(<ThemeProvider>page</ThemeProvider>);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('prefers the saved choice over the system', () => {
    prefersDark(true);
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('light'));

    render(<ThemeProvider>page</ThemeProvider>);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
