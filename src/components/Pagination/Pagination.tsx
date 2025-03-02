import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useSearchLink } from '~/hooks/useSearchLink';
import { PAGE_SIZE } from '~/store/api/apiSlice';
import { DOTS, pageRange } from '~/utils/pagination';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize?: number;
  siblingCount?: number;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export function Pagination({
  totalCount,
  currentPage,
  pageSize = PAGE_SIZE,
  siblingCount = 1,
}: PaginationProps) {
  const { toPage } = useSearchLink();
  const pages = pageRange({ totalCount, pageSize, siblingCount, currentPage });

  if (pages.length < 2) return null;

  return (
    <ul className={styles.paginationContainer}>
      {pages.map((page, i) => {
        if (page === DOTS) {
          // Drawn dots: the … glyph sits on the baseline, below the centre.
          return (
            <li
              className={clsx(styles.paginationItem, styles.dots)}
              key={`dots-${i}`}
              aria-hidden="true"
            >
              <svg className={styles.dotsIcon} viewBox="0 0 16 4">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="8" cy="2" r="1.5" />
                <circle cx="14" cy="2" r="1.5" />
              </svg>
            </li>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <li key={page}>
            <Link
              to={toPage(page)}
              className={clsx(styles.paginationItem, {
                [styles.selected]: isCurrent,
              })}
              aria-current={isCurrent ? 'page' : undefined}
              onClick={scrollToTop}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
