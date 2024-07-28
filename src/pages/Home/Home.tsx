import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Header, List, Pagination } from '~/components';
import { useLocalStorage, LSKey } from '~/hooks';
import { useGetCharactersQuery } from '~/store/api/apiSlice';
import styles from './Home.module.scss';

export type DetailsOutletContext = {
  setActiveElement: Dispatch<SetStateAction<string>>;
  wrapperRef: React.RefObject<HTMLDivElement>;
};

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [activeElement, setActiveElement] = useState('');
  const { value: searchValue, setValue: setSearchValue } = useLocalStorage(
    LSKey,
    ''
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading, isFetching } = useGetCharactersQuery({
    name: searchValue,
    page: currentPage,
  });

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
    const searchFromUrl = searchParams.get('search') || '';
    if (searchFromUrl !== searchValue) {
      setSearchValue(searchFromUrl);
    }
  }, [searchParams, currentPage, searchValue, setSearchValue]);

  const updateSearchParams = useCallback(
    (name: string, page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('search', name);
      params.set('page', page.toString());
      setSearchParams(params);
    },
    [setSearchParams, searchParams]
  );

  const onPageChangeHandler = useCallback(
    (page: number) => {
      setCurrentPage(page);
      updateSearchParams(searchValue, page);
    },
    [searchValue, updateSearchParams]
  );

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
        <Pagination
          currentPage={currentPage}
          totalCount={data.count}
          onPageChange={onPageChangeHandler}
        />
      )}
    </div>
  );
};
