import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router-dom';
import { usePagination, DOTS, useSearchContext } from '~/hooks';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  pageSize?: number;
  siblingCount?: number;
};

export const Pagination = (props: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const { pageSize, siblingCount } = props;
  const { currentPage, totalCount, setCurrentPage } = useSearchContext();

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

        searchParams.set('page', pageNumber.toString());

        return (
          <Link to={{ search: searchParams.toString() }} key={pageNumber}>
            <li
              className={clsx(styles.paginationItem, {
                [styles.selected]: +pageNumber === currentPage,
              })}
              onClick={() => {
                onTop();
                setCurrentPage(+pageNumber);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
