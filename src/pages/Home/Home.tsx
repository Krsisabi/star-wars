import { useState, useEffect, ChangeEvent } from 'react';
import { Outlet } from 'react-router';
import { Character, TResponse } from '~/types';
import { List } from '~/components/List';
import { Search } from '~/components/Search';
import { Pagination } from '~/components/Pagination';
import { ErrorButton } from '~/components/ErrorButton';
import styles from './Home.module.scss';

export const BASE_URL = 'https://swapi.dev/api/people/';

export const Home = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') ?? ''
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchCharacters(searchValue);
  }, [currentPage]);

  useEffect(() => {
    if (hasError) {
      throw new Error('Your bad =(');
    }
  }, [hasError]);

  const fetchCharacters = async (character: string) => {
    setIsLoading(true);

    const urlPage = `${BASE_URL}?page=${currentPage}`;

    const url = character ? `${urlPage}&search=${character}` : `${urlPage}`;
    try {
      const res = await fetch(url);
      const data = (await res.json()) as TResponse;
      const { results } = data;
      setTotalCount(data.count);
      setCharacters(results);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.home}>
      <ErrorButton />
      <Search
        value={searchValue}
        onChange={searchInputHandler}
        onSubmit={fetchCharacters}
      />
      {isLoading ? (
        <h2 style={{ marginTop: '32px' }}>Loading...</h2>
      ) : (
        <>
          <div className={styles.wrapper}>
            <List data={characters} />
            <Outlet />
          </div>
          {characters && (
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};
