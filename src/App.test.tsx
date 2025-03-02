import userEvent from '@testing-library/user-event';

import { App } from '~/App';
import { AppProviders } from '~/AppProviders';
import { makeStore } from '~/store/store';
import { currentLocation, render, screen } from '~/test/render';
import { STORAGE_KEYS } from '~/utils/storage';

const renderApp = (url = '/') => {
  const store = makeStore();
  return render(
    <AppProviders store={store}>
      <App />
    </AppProviders>,
    { store, history: [url] }
  );
};

describe('App', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('shows a loading list first', () => {
    renderApp();
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
  });

  it('returns from the error page to the list', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText(/generate error/i));
    expect(screen.getByText('Oops!')).toBeInTheDocument();

    await user.click(screen.getByText(/back to characters/i));
    expect(screen.queryByText('Oops!')).not.toBeInTheDocument();
    expect(screen.getByText(/generate error/i)).toBeInTheDocument();
  });

  it('restores the saved search into the address', async () => {
    localStorage.setItem(STORAGE_KEYS.searchValue, JSON.stringify('yoda'));
    renderApp('/');

    expect(await screen.findByRole('textbox')).toHaveValue('yoda');
    expect(currentLocation()).toHaveTextContent('/?search=yoda&page=1');
    expect(localStorage.getItem(STORAGE_KEYS.searchValue)).toBe('"yoda"');
  });

  it('prefers the search in the address over the saved one', () => {
    localStorage.setItem(STORAGE_KEYS.searchValue, JSON.stringify('yoda'));
    renderApp('/?search=luke&page=2');

    expect(screen.getByRole('textbox')).toHaveValue('luke');
    expect(currentLocation()).toHaveTextContent('/?search=luke&page=2');
  });

  it('opens normally when the stored theme is corrupt', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '{not json');
    renderApp();

    expect(screen.queryByText('Oops!')).not.toBeInTheDocument();
    expect(screen.getByText(/generate error/i)).toBeInTheDocument();
  });
});
