import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { Search } from '~/components/Search';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { BackButton, LocationProbe } from '@/tests/router';

const renderSearch = (entries: string[]) =>
  render(
    <MemoryRouter initialEntries={entries} initialIndex={entries.length - 1}>
      <Search />
      <LocationProbe />
      <BackButton />
    </MemoryRouter>
  );

describe('Search Component', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('sends the trimmed term to the address, from the first page, and saves it', async () => {
    renderSearch(['/?page=3']);

    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox'), '  luke  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByTestId('location')).toHaveTextContent(
      '/?search=luke&page=1'
    );
    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBe('"luke"');
    expect(screen.getByRole('textbox')).toHaveValue('luke');
  });

  it('drops the search from the address when submitted empty', async () => {
    renderSearch(['/?search=luke&page=2']);

    const user = userEvent.setup();
    await user.clear(screen.getByRole('textbox'));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByTestId('location')).toHaveTextContent('/?page=1');
    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBe('""');
  });

  it('shows the term from the address', () => {
    localStorage.setItem(STORAGE_KEYS.searchValue, JSON.stringify('yoda'));
    renderSearch(['/?search=luke&page=1']);

    expect(screen.getByRole('textbox')).toHaveValue('luke');
  });

  it('follows the address back without touching storage', async () => {
    renderSearch(['/?search=a&page=1', '/?search=yoda&page=1']);
    expect(screen.getByRole('textbox')).toHaveValue('yoda');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(screen.getByRole('textbox')).toHaveValue('a');
    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBeNull();
  });
});
