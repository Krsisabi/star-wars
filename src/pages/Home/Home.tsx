import clsx from 'clsx';
import { useRef } from 'react';
import { Navigate, useMatch, useOutlet } from 'react-router-dom';

import type { DetailsOutletContext } from '~/components/Details';
import { ErrorButton } from '~/components/ErrorButton';
import { Flyout } from '~/components/Flyout';
import { Header } from '~/components/Header';
import { List, ListSkeleton } from '~/components/List';
import { Pagination } from '~/components/Pagination';
import { useSearchQuery } from '~/hooks/useSearchQuery';
import { ROUTES } from '~/routes';
import { useGetCharactersQuery } from '~/store/api/apiSlice';

import styles from './Home.module.scss';

export function Home() {
  const { search, page, restoreTo } = useSearchQuery();
  const wrapperRef = useRef<HTMLElement>(null);
  const details = useOutlet({ wrapperRef } satisfies DetailsOutletContext);
  const activeId = useMatch(ROUTES.details)?.params.id;

  const { data, error, isLoading, isFetching } = useGetCharactersQuery(
    { search, page },
    { skip: restoreTo !== null }
  );

  if (restoreTo !== null) {
    return <Navigate to={{ search: restoreTo }} replace />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <main
        className={clsx(styles.content, { [styles.withDetails]: details })}
        ref={wrapperRef}
      >
        <div className={styles.listArea}>
          {isLoading ? (
            <ListSkeleton fit={Boolean(details)} />
          ) : (
            <List
              data={data?.results}
              activeId={activeId}
              error={error}
              isRefreshing={isFetching}
              fit={Boolean(details)}
            />
          )}
        </div>
        {details}
      </main>
      <footer className={styles.bar}>
        <div className={styles.selection}>
          <Flyout />
        </div>
        <nav className={styles.pages} aria-label="Pages">
          {data && !isLoading && (
            <Pagination currentPage={page} totalCount={data.count} />
          )}
        </nav>
        <div className={styles.actions}>
          <ErrorButton />
        </div>
      </footer>
    </div>
  );
}
