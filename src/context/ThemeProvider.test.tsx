import { render } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

const root = document.documentElement;

describe('ThemeProvider', () => {
  afterEach(() => {
    delete root.dataset.theme;
  });

  it('keeps the theme the page opened with', () => {
    root.dataset.theme = 'dark';

    render(<ThemeProvider>page</ThemeProvider>);

    expect(root).toHaveAttribute('data-theme', 'dark');
  });

  it('themes a page that has no switcher on it', () => {
    render(
      <ThemeProvider>
        <h1>404 Not Found</h1>
      </ThemeProvider>
    );

    expect(root).toHaveAttribute('data-theme', 'light');
  });

  it('starts light when the page has no theme it knows', () => {
    root.dataset.theme = 'blue';

    render(<ThemeProvider>page</ThemeProvider>);

    expect(root).toHaveAttribute('data-theme', 'light');
  });
});
