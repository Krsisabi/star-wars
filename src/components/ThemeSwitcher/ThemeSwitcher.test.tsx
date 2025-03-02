import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '~/context/theme-provider';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { ThemeSwitcher } from './ThemeSwitcher';

const renderSwitcher = () =>
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );

describe('ThemeSwitcher', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('names the theme it switches to', () => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('light'));

    renderSwitcher();

    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('switches the whole document and remembers the choice', async () => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify('light'));
    const user = userEvent.setup();

    renderSwitcher();
    await user.click(screen.getByRole('button'));

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button')).toHaveAccessibleName(
      'Switch to light theme'
    );
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"');
  });
});
