import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { usePagination, DOTS, useSearchContext } from '~/hooks';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  pageSize?: number;
  siblingCount?: number;
};

export const Pagination = (props: PaginationProps) => {
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

        return (
          <Link to={`/search?page=${pageNumber}`} key={pageNumber}>
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
