import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '~/App';
import { RouteErrorBoundary } from '~/components/ErrorBoundary';
import { ThemeProvider } from '~/context/theme-provider';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { store } from '~/store';

const renderApp = () =>
  render(
    <MemoryRouter>
      <RouteErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </RouteErrorBoundary>
    </MemoryRouter>
  );

describe('App', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should rendering loader', async () => {
    renderApp();
    const head = await screen.getByRole('heading');
    expect(head).toHaveTextContent(/loading/i);
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

  it('shows the error page when a provider fails', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(STORAGE_KEYS.theme, '{not json');
    renderApp();

    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });
});
