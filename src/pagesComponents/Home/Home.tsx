import { useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage, LSKey } from '~/hooks';
import { Header, List, Pagination, Flyout } from '~/components';
import styles from './Home.module.scss';
import { CharacterNormilized } from '~/types';

export type HomeProps = {
  data: { results?: CharacterNormilized[]; count?: number } | null;
};

export const Home = ({ data, children }: PropsWithChildren<HomeProps>) => {
  const router = useRouter();
  const { page, search } = router.query;
  const pageNumber = typeof page === 'string' ? Number(page) : 1;
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [activeElement, setActiveElement] = useState('');
  const { value: searchValue, setValue: setSearchValue } = useLocalStorage(
    LSKey,
    ''
  );

  useEffect(() => {
    const searchFromUrl = typeof search === 'string' ? search : '';
    if (searchFromUrl !== searchValue) {
      setSearchValue(searchFromUrl);
    }
  }, [currentPage, searchValue, setSearchValue, search]);

  const onPageChangeHandler = useCallback(
    (page: number) => {
      setCurrentPage(page);
      updateSearchParams(searchValue, page);

      function updateSearchParams(name: string, page: number) {
        router.push({
          pathname: router.pathname,
          query: { search: name, page: page.toString() },
        });
      }
    },
    [router, searchValue]
  );

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.wrapper}>
        {!data?.results ? (
          <h2 style={{ margin: 'auto' }}>Loading...</h2>
        ) : (
          <List
            data={data.results}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        )}
        {children}
      </div>
      {data?.count && (
        <Pagination
          currentPage={currentPage}
          totalCount={data.count}
          onPageChange={onPageChangeHandler}
        />
      )}
      <Flyout />
    </div>
  );
};
