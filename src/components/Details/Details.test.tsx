import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { Link, MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';

import type { DetailsOutletContext } from '~/pages/Home';
import type * as ApiSlice from '~/store/api/apiSlice';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import { mockData } from '@/tests/mockData';
import { LocationProbe } from '@/tests/router';

import { Details } from './Details';

// the component is tested on its own; the request itself belongs to apiSlice
vi.mock('~/store/api/apiSlice', async (importOriginal) => ({
  ...(await importOriginal<typeof ApiSlice>()),
  useGetDetailsQuery: vi.fn(),
}));

const mockQuery = vi.mocked(useGetDetailsQuery);

type QueryResult = ReturnType<typeof useGetDetailsQuery>;

const queryState = (state: Partial<QueryResult>) =>
  mockQuery.mockReturnValue({
    currentData: undefined,
    error: undefined,
    ...state,
  } as QueryResult);

const ListArea = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  return (
    <main ref={wrapperRef}>
      <p>the list</p>
      <Link to="/details/2?search=luke&page=2">another card</Link>
      <Outlet context={{ wrapperRef } satisfies DetailsOutletContext} />
    </main>
  );
};

const renderDetails = () =>
  render(
    <MemoryRouter initialEntries={['/details/1?search=luke&page=2']}>
      <Routes>
        <Route path="/" element={<ListArea />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
      <LocationProbe />
    </MemoryRouter>
  );

const location = () => screen.getByTestId('location');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Details', () => {
  it('keeps its frame while the request is in flight', () => {
    queryState({});

    renderDetails();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /loading/i
    );
    expect(screen.getByRole('complementary')).toHaveAttribute(
      'aria-busy',
      'true'
    );
    expect(screen.getByText('Height')).toBeInTheDocument();
  });

  it('renders the character once it arrives', () => {
    queryState({ currentData: mockData[0] });

    renderDetails();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Luke Skywalker'
    );
    expect(screen.getByText('male · 19BBY')).toBeInTheDocument();
    expect(screen.getByText('172 cm')).toBeInTheDocument();
    expect(screen.getByText('77 kg')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
  });

  it('reports a failed request instead of loading forever', () => {
    queryState({ error: { status: 500, data: 'boom' } });

    renderDetails();

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('closes on the close button, keeping the search and the page', async () => {
    queryState({ currentData: mockData[0] });
    const user = userEvent.setup();

    renderDetails();
    await user.click(screen.getByRole('button', { name: 'Close details' }));

    expect(location()).toHaveTextContent('/?search=luke&page=2');
  });

  it('closes on Escape', async () => {
    queryState({ currentData: mockData[0] });
    const user = userEvent.setup();

    renderDetails();
    await user.keyboard('{Escape}');

    expect(location()).toHaveTextContent('/?search=luke&page=2');
  });

  it('closes on a click in the list', async () => {
    queryState({ currentData: mockData[0] });
    const user = userEvent.setup();

    renderDetails();
    await user.click(screen.getByText('the list'));

    expect(location()).toHaveTextContent('/?search=luke&page=2');
  });

  it('closes on a tap on the dim behind the sheet', async () => {
    queryState({ currentData: mockData[0] });
    const user = userEvent.setup();

    renderDetails();
    // The dim has nothing to find it by: it comes right before the card.
    const backdrop = screen.getByRole('complementary').previousElementSibling;
    await user.click(backdrop!);

    expect(location()).toHaveTextContent('/?search=luke&page=2');
  });

  it('lets a link in the list do its own job', async () => {
    queryState({ currentData: mockData[0] });
    const user = userEvent.setup();

    renderDetails();
    await user.click(screen.getByRole('link', { name: 'another card' }));

    expect(location()).toHaveTextContent('/details/2?search=luke&page=2');
  });
});
