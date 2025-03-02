import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { BackButton, LocationProbe } from '@/tests/router';

import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
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

    return render(
      <MemoryRouter initialEntries={['/', url]} initialIndex={1}>
        <Pagination {...defaultProps} {...props} />
        <LocationProbe />
        <BackButton />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  test('marks the current page', () => {
    renderPagination('/?page=3', { currentPage: 3 });

    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: '2' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  test('changes only the page, keeping the encoded search and open details', () => {
    renderPagination('/details/5?search=r2 d2&page=1');

    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/details/5?search=r2+d2&page=2'
    );
  });

  test('takes one step in history per click', async () => {
    renderPagination('/?search=a&page=1');

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: '2' }));
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/?search=a&page=2'
    );

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/?search=a&page=1'
    );
  });
});
