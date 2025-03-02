import { ThemeProvider } from '~/context/ThemeProvider';
import type * as ApiSlice from '~/store/api/apiSlice';
import { useGetCharactersQuery } from '~/store/api/apiSlice';
import { render, screen } from '~/test/render';

import { Home } from './Home';

vi.mock('~/store/api/apiSlice', async (importOriginal) => ({
  ...(await importOriginal<typeof ApiSlice>()),
  useGetCharactersQuery: vi.fn(),
}));

type QueryResult = ReturnType<typeof useGetCharactersQuery>;

const queryState = (state: Partial<QueryResult>) =>
  vi.mocked(useGetCharactersQuery).mockReturnValue({
    data: undefined,
    error: undefined,
    ...state,
  } as QueryResult);

const renderHome = () =>
  render(
    <ThemeProvider>
      <Home />
    </ThemeProvider>,
    { history: ['/?search=luke&page=9'] }
  );

describe('Home', () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('says the page does not exist when the list has no such page', () => {
    queryState({ error: { status: 404, data: { detail: 'Not found.' } } });

    renderHome();

    expect(screen.getByRole('heading')).toHaveTextContent(
      "Page 9 doesn't exist"
    );
    expect(screen.getByRole('link', { name: 'Go to page 1' })).toHaveAttribute(
      'href',
      '/?search=luke&page=1'
    );
  });

  it('keeps the general message for any other failure', () => {
    queryState({
      error: { status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch' },
    });

    renderHome();

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText(/doesn't exist/)).not.toBeInTheDocument();
  });
});
