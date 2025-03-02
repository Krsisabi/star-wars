import userEvent from '@testing-library/user-event';

import { currentLocation, render, screen } from '~/test/render';

import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const renderPagination = (
    url = '/?page=1',
    props: Partial<PaginationProps> = {}
  ) => {
    const defaultProps: PaginationProps = {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 2,
      currentPage: 1,
    };

    return render(<Pagination {...defaultProps} {...props} />, {
      history: ['/', url],
    });
  };

  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('offers the pages around the current one', () => {
    renderPagination();

    const pageItems = screen.getAllByRole('listitem');
    expect(pageItems.length).toBeGreaterThanOrEqual(5);
  });

  it('keeps every page link inside a list item', () => {
    renderPagination();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.parentElement?.tagName).toBe('LI');
    });
  });

  it('marks the current page', () => {
    renderPagination('/?page=3', { currentPage: 3 });

    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: '2' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('changes only the page, keeping the encoded search and open details', () => {
    renderPagination('/details/5?search=r2 d2&page=1');

    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/details/5?search=r2+d2&page=2'
    );
  });

  it('takes one step in history per click', async () => {
    renderPagination('/?search=a&page=1');

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: '2' }));
    expect(currentLocation()).toHaveTextContent('/?search=a&page=2');

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(currentLocation()).toHaveTextContent('/?search=a&page=1');
  });
});
