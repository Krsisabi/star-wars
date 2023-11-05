import { useState, useEffect, ChangeEvent } from 'react';
import { Outlet } from 'react-router';
import { Character, TResponse } from '../../types';
import { List } from '../../components/List';
import styles from './Home.module.scss';
import { Search } from '../../components/Search';

const BASE_URL = 'https://swapi.dev/api/people/';

export const Home = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') ?? ''
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchCharacters(searchValue);
  }, []);

  useEffect(() => {
    if (hasError) {
      throw new Error('Your bad =(');
    }
  }, [hasError]);

  const fetchCharacters = async (character: string) => {
    setIsLoading(true);
    const url = character ? `${BASE_URL}?search=${character}` : BASE_URL;
    try {
      const res = await fetch(url);
      const data = (await res.json()) as TResponse;
      const { results } = data;
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

  const throwError = () => {
    setHasError(true);
  };

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
      {isLoading ? (
        <h2 style={{ marginTop: '32px' }}>Loading...</h2>
      ) : (
        <div className={styles.wrapper}>
          <List data={characters} />
          <Outlet />
        </div>
      )}
    </div>
  );
};
