import { useRef } from 'react';
import { Navigate, useMatch, useOutlet } from 'react-router-dom';
import clsx from 'clsx';
import { Header, List, Pagination } from '~/components';
import { ErrorButton } from '~/components/ErrorButton';
import { ListSkeleton } from '~/components/List';
import { useSearchQuery } from '~/hooks';
import { useGetCharactersQuery } from '~/store/api/apiSlice';
import styles from './Home.module.scss';
import { Flyout } from '~/components/Flyout';

export type DetailsOutletContext = {
  wrapperRef: React.RefObject<HTMLElement>;
};

export const Home = () => {
  const { search, page, restoreTo } = useSearchQuery();
  const wrapperRef = useRef<HTMLElement>(null);
  const details = useOutlet({ wrapperRef } satisfies DetailsOutletContext);
  const activeId = useMatch('/details/:id')?.params.id;

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
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <List
            data={data?.results}
            activeId={activeId}
            error={error}
            isRefreshing={isFetching}
          />
        )}
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
};
