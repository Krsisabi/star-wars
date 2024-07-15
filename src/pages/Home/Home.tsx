import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Outlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Character, TResponse } from '~/types';
import { List, Search, Pagination } from '~/components';
import { useLocalStorage, LSKey } from '~/hooks';
import styles from './Home.module.scss';

export const BASE_URL = 'https://swapi.dev/api/people/';

export const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  const { value: searchValue, setValue: setSearchValue } = useLocalStorage(
    LSKey,
    ''
  );

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

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const throwError = () => setHasError(true);

  return (
    <div className={styles.home}>
      <button className={styles.button} onClick={throwError}>
        Generate error
      </button>
      <Search
        value={searchValue}
        onChange={searchInputHandler}
        onSubmit={fetchCharacters}
      />
      <div className={styles.wrapper}>
        {isLoading ? (
          <h2 style={{ margin: 'auto' }}>Loading...</h2>
        ) : (
          <List data={characters} />
        )}
        <Outlet />
      </div>
      {characters && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
