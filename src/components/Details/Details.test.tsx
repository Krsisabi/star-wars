import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/setup';
import { mockData } from '@/tests/mockData';
import { Details } from './Details';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

vi.mock('react-router-dom', async () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => vi.fn(),
  useOutletContext: vi.fn(() => ({
    setActiveElement: vi.fn(),
    wrapperRef: { current: document.createElement('div') },
  })),
  useSearchParams: () => [new URLSearchParams()],
}));

describe('Details Component', async () => {
  test('renders loading state initially', async () => {
    fetchMock.mockResponse(JSON.stringify(mockData[0]));
    render(<Details />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    const header = await screen.getByText(/loading/i);

    const user = userEvent.setup();
    await user.click(header);

    const button = await screen.findByRole('button');
    await user.click(button);
  });
});
