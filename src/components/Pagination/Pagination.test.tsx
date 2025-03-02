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

  test('renders correct number of pages', () => {
    renderPagination();

    const pageItems = screen.getAllByRole('listitem');
    expect(pageItems.length).toBeGreaterThanOrEqual(5);
  });

  test('keeps every page link inside a list item', () => {
    renderPagination();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.parentElement?.tagName).toBe('LI');
    });
  });

  test('reports the clicked page', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const onPageChange = vi.fn();
    renderPagination({ onPageChange });

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: '2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
