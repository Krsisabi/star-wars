import clsx from 'clsx';

import { usePagination, DOTS } from '~/hooks/usePagination';

import styles from './Pagination.module.scss';
import { Link, useSearchParams } from 'react-router-dom';

export type PaginationProps = {
  totalCount: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number;
};

export const Pagination = (props: PaginationProps) => {
  const { totalCount, siblingCount, currentPage, pageSize } = props;

  const [searchParams] = useSearchParams();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only the query changes, so an open details panel stays open.
  const linkTo = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return { search: `?${params}` };
  };

  return (
    <ul className={styles.paginationContainer}>
      {paginationRange?.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${styles.paginationItem} ${styles.dots}`}
              key={`dots-${i}`}
            >
              &#8230;
            </li>
          );
        }

        const isCurrent = +pageNumber === currentPage;

        return (
          <li key={pageNumber}>
            <Link
              to={linkTo(+pageNumber)}
              className={clsx(styles.paginationItem, {
                [styles.selected]: isCurrent,
              })}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={onTop}
            >
              {pageNumber}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
