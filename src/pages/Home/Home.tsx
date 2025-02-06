import { useState, useEffect, ChangeEvent, useRef, useCallback } from 'react';
import { Character, TResponse } from '~/types';
import { List, Search } from '~/components';
import { useLocalStorage } from '~/hooks';
import styles from './Home.module.scss';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import { fetchItems } from '~/services/api';

export const Home = () => {
  const [searchValue, setSearchValue] = useLocalStorage(
    STORAGE_KEYS.searchValue,
    ''
  );

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const initSearchValue = useRef(searchValue);

  const loadCharacters = useCallback(
    async (character: string) => {
      try {
        const trimmedValue = character.trim();

        setSearchValue(trimmedValue);
        setIsLoading(true);

        const { results } = await fetchItems<TResponse>(trimmedValue);

        setCharacters(results);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchValue]
  );

  useEffect(() => {
    loadCharacters(initSearchValue.current);
  }, [loadCharacters]);

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const throwError = () => {
    setHasError(true);
  };

  return (
    <div className={styles.home}>
      <Search
        value={searchValue}
        onChange={searchInputHandler}
        onSubmit={loadCharacters}
      />

      {isLoading ? (
        <h2 style={{ marginTop: '32px' }}>Loading...</h2>
      ) : (
        <List data={characters} />
      )}
      <button className={styles.button} onClick={throwError}>
        Generate error
      </button>
    </div>
  );
};
