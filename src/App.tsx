import { ChangeEvent, useEffect, useState } from 'react';
import { Search } from './components/Search';
import { List } from './components/List';
import { Character, TResponse } from './types';
import styles from './App.module.scss';

const BASE_URL = 'https://swapi.dev/api/people/';
const INIT_SEARCH_VALUE = localStorage.getItem('searchValue') ?? '';

function App() {
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchCharacters(INIT_SEARCH_VALUE);
  }, []);

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  const fetchCharacters = async (character: string) => {
    try {
      setSearchValue((prev) => prev.trim());
      setIsLoading(true);
      const url = new URL(BASE_URL);

      if (character) {
        url.searchParams.append('search', character);
      }

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`Error fetching characters: ${res.statusText}`);
      }

      setIsLoading(false);
      const { results } = (await res.json()) as TResponse;

      setCharacters(results);
    } catch (error) {
      console.error('Failed to fetch characters:', error);
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
    <div className={styles.app}>
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
        <List data={characters} />
      )}
    </div>
  );
}

export default App;
