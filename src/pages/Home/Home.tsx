import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { TResponse } from '~/types';
import { List } from '~/components/List';
import { Search } from '~/components/Search';
import { Pagination } from '~/components/Pagination';
import { ErrorButton } from '~/components/ErrorButton';
import { useSearch } from '~/hooks';
import styles from './Home.module.scss';

export const BASE_URL = 'https://swapi.dev/api/people/';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { searchValue, results, currentPage, setResults, setTotalCount } =
    useSearch();

  useEffect(() => {
    fetchCharacters(searchValue);
  }, [currentPage]);

  const fetchCharacters = async (character: string) => {
    setIsLoading(true);

    const urlPage = `${BASE_URL}?page=${currentPage}`;

    const url = character ? `${urlPage}&search=${character}` : `${urlPage}`;
    try {
      const res = await fetch(url);
      const data = (await res.json()) as TResponse;
      const { results } = data;
      setTotalCount(data.count);
      setResults(results);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.home}>
      <ErrorButton />
      <Search onSubmit={fetchCharacters} />
      {isLoading ? (
        <h2 style={{ marginTop: '32px' }}>Loading...</h2>
      ) : (
        <>
          <div className={styles.wrapper}>
            <List />
            <Outlet />
          </div>
          {results && <Pagination />}
        </>
      )}
    </div>
  );
};
