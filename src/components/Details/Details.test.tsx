import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { Details } from './Details';
import { useGetDetailsQuery } from '~/store/api/apiSlice';

const navigate = vi.fn();
const setActiveElement = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useParams: () => ({ id: '1' }),
  useNavigate: () => navigate,
  useOutletContext: () => ({
    setActiveElement,
    wrapperRef: { current: document.createElement('div') },
  }),
  useSearchParams: () => [new URLSearchParams()],
}));

// the component is tested on its own; the request itself belongs to apiSlice
vi.mock('~/store/api/apiSlice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('~/store/api/apiSlice')>()),
  useGetDetailsQuery: vi.fn(),
}));

const mockQuery = vi.mocked(useGetDetailsQuery);

type QueryResult = ReturnType<typeof useGetDetailsQuery>;

const queryState = (state: Partial<QueryResult>) =>
  mockQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: undefined,
    ...state,
  } as QueryResult);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Details', () => {
  it('renders the loading state while the request is in flight', () => {
    queryState({ isLoading: true });

    render(<Details />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the character once it arrives', () => {
    queryState({ data: mockData[0] });

    render(<Details />);

    expect(screen.getByRole('heading')).toHaveTextContent('Luke Skywalker');
    expect(screen.getByText(/eye color - blue/)).toBeInTheDocument();
    expect(screen.getByText(/skin color - fair/)).toBeInTheDocument();
  });

  it('reports a failed request instead of loading forever', () => {
    queryState({ error: { status: 500, data: 'boom' } });

    render(<Details />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('closes the panel on the close button', async () => {
    queryState({ data: mockData[0] });
    const user = userEvent.setup();

    render(<Details />);
    await user.click(screen.getByRole('button', { name: 'X' }));

    expect(setActiveElement).toHaveBeenCalledWith('');
    expect(navigate).toHaveBeenCalled();
  });
});
