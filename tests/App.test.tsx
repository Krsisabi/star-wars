import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '~/App';
import { store } from '~/store';
import { ThemeProvider } from '~/context/theme';

describe('App', () => {
  it('should rendering loader', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    const head = await screen.getByRole('heading');
    expect(head).toHaveTextContent(/loading/i);
  });
});
