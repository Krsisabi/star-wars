import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from '~/context/ThemeProvider';
import { STORAGE_KEYS } from '~/utils/storage';

import { ThemeSwitcher } from './ThemeSwitcher';

const root = document.documentElement;

const renderSwitcher = () =>
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    root.dataset.theme = 'light';
  });

  afterEach(() => {
    localStorage.clear();
    delete root.dataset.theme;
  });

  it('names the theme it switches to', () => {
    renderSwitcher();

    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument();
  });

  it('switches the whole document and remembers the choice', async () => {
    const user = userEvent.setup();

    renderSwitcher();
    await user.click(screen.getByRole('button'));

    expect(root).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button')).toHaveAccessibleName(
      'Switch to light theme'
    );
    expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe('"dark"');
  });
});
