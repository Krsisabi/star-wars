import clsx from 'clsx';
import { useRouter } from 'next/router';
import { usePagination, DOTS } from '~/hooks/usePagination';
import styles from './Pagination.module.scss';

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

  const router = useRouter();
  const { characterId } = router.query;

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

  const handlePageChange = (pageNumber: number) => {
    onTop();
    onPageChange(pageNumber);
    const query = { ...router.query, page: pageNumber };
    router.push({
      pathname: characterId ? `/details/[characterId]` : '/',
      query,
    });
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
          <li
            className={clsx(styles.paginationItem, {
              [styles.selected]: +pageNumber === currentPage,
            })}
            onClick={() => handlePageChange(+pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};
