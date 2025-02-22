import { render, screen } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeProvider } from '~/context/theme-provider';

describe('ThemeSwitcher', () => {
  it('renders button with correct initial theme text', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent(
      /Set Light Theme|Set Dark Theme/
    );
  });
});
