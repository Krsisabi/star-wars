import clsx from 'clsx';

import { usePagination, DOTS } from '~/hooks/usePagination';

import styles from './Pagination.module.scss';
import { Link, useParams } from 'react-router-dom';

export type PaginationProps = {
  totalCount: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange:
    | React.Dispatch<React.SetStateAction<number>>
    | ((value: number) => void);
};

export const Pagination = (props: PaginationProps) => {
  const { onPageChange, totalCount, siblingCount, currentPage, pageSize } =
    props;

  const { id } = useParams();

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
          <Link
            to={`${id ? `/details/${id}` : ''}?page=${pageNumber}`}
            key={pageNumber}
          >
            <li
              className={clsx(styles.paginationItem, {
                [styles.selected]: +pageNumber === currentPage,
              })}
              onClick={() => {
                onTop();
                onPageChange(+pageNumber);
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
