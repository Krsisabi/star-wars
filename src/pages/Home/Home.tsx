import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Character, TResponse } from '~/types';
import { List, Pagination } from '~/components';
import { useLocalStorage } from '~/hooks';
import styles from './Home.module.scss';
import { Outlet, useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { Header } from '~/components/Header';
import { BASE_URL } from '~/services/api';
import { ErrorButton } from '~/components/ErrorButton';

export type DetailsOutletContext = {
  setActiveElement: Dispatch<SetStateAction<string>>;
  wrapperRef: React.RefObject<HTMLDivElement>;
};

export const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [activeElement, setActiveElement] = useState('');
  const [searchValue, setSearchValue] = useLocalStorage(
    STORAGE_KEYS.searchValue,
    ''
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchCharacters = useCallback(
    async (character: string) => {
      try {
        setSearchValue((prev) => prev.trim());
        setIsLoading(true);
        const url = new URL(BASE_URL);

        searchParams.set('page', currentPage.toString());

        if (character) {
          searchParams.set('search', character);
          searchParams.set('page', '1');
          setCurrentPage(1);
        }

        if (!character) {
          searchParams.delete('search');
        }

        url.search = searchParams.toString();
        setSearchParams(searchParams);

        const res = await fetch(url.toString());
        if (!res.ok) {
          throw new Error(`Error fetching characters: ${res.statusText}`);
        }

        setIsLoading(false);
        const data = (await res.json()) as TResponse;

        setTotalCount(data.count);
        setCharacters(data.results);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setIsLoading(false);
      }
    },
    [currentPage, searchParams, setSearchParams, setSearchValue]
  );

  useEffect(() => {
    fetchCharacters(searchValue);
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className={styles.home}>
      <Header fetchCharacters={fetchCharacters} />
      <div className={styles.wrapper} ref={wrapperRef}>
        {isLoading ? (
          <h2 style={{ margin: 'auto' }}>Loading...</h2>
        ) : (
          <List
            data={characters}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
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
      {characters && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      )}
      <ErrorButton />
    </div>
  );
};
