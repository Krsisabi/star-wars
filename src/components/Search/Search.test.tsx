import userEvent from '@testing-library/user-event';

import { Search } from '~/components/Search';
import { currentLocation, render, screen } from '~/test/render';
import { STORAGE_KEYS } from '~/utils/storage';

const renderSearch = (history: string[]) => render(<Search />, { history });

describe('Search', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('sends the trimmed term to the address, from the first page, and saves it', async () => {
    renderSearch(['/?page=3']);

    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox'), '  luke  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(currentLocation()).toHaveTextContent('/?search=luke&page=1');
    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBe('"luke"');
    expect(screen.getByRole('textbox')).toHaveValue('luke');
  });

  it('drops the search from the address when submitted empty', async () => {
    renderSearch(['/?search=luke&page=2']);

    const user = userEvent.setup();
    await user.clear(screen.getByRole('textbox'));
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(currentLocation()).toHaveTextContent('/?page=1');
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
