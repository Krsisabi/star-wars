import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Header, List, Pagination } from '~/components';
import { ErrorButton } from '~/components/ErrorButton';
import { useSearchQuery } from '~/hooks';
import { useGetCharactersQuery } from '~/store/api/apiSlice';
import styles from './Home.module.scss';
import { Flyout } from '~/components/Flyout';

export type DetailsOutletContext = {
  setActiveElement: Dispatch<SetStateAction<string>>;
  wrapperRef: React.RefObject<HTMLDivElement>;
};

export const Home = () => {
  const { search, page, restoreTo } = useSearchQuery();
  const [activeElement, setActiveElement] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      <div className={styles.wrapper} ref={wrapperRef}>
        {isFetching ? (
          <h2 style={{ margin: 'auto' }}>Loading...</h2>
        ) : (
          <List
            data={data?.results}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            error={error}
          />
        )}
        <Outlet
          context={
            {
              setActiveElement,
              wrapperRef,
            } satisfies DetailsOutletContext
          }
        />
      </div>
      {data?.results && !isLoading && (
        <Pagination currentPage={page} totalCount={data.count} />
      )}
      <ErrorButton />
      <Flyout />
    </div>
  );
};
