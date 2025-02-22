import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/setup';
import { Pagination, PaginationProps } from './Pagination';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn().mockReturnValue({ id: '1' }),
  };
});

describe('Pagination Component', () => {
  const renderPagination = (props: Partial<PaginationProps> = {}) => {
    const defaultProps: PaginationProps = {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 2,
      currentPage: 1,
      onPageChange: vi.fn(),
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  test('renders correct number of pages', async () => {
    renderPagination();

    const pageItems = screen.getAllByRole('listitem');
    expect(pageItems.length).toBeGreaterThanOrEqual(5);

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
  });
});
