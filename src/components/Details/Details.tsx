import { useCallback, useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { BASE_URL } from '~/pages/Home';
import { Character } from '~/types';
import styles from './Details.module.scss';

export function Details() {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const fetchCharacter = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);
      const url = `${BASE_URL}${id}`;
      try {
        const res = await fetch(url, { signal });
        const data = (await res.json()) as Character;
        setCharacter(data);
        setIsLoading(false);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to fetch character:', error);
        }
      }
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCharacter(signal);

    return () => {
      controller.abort();
    };
  }, [fetchCharacter, id]);

  const closeDetails =
    location.pathname
      .split('/')
      .filter((value) => !['details', id].includes(value))
      .join('/') + searchParams.toString()
      ? `?${searchParams.toString()}`
      : '';

  return (
    <div className={styles.details}>
      <Link className={styles.button} to={closeDetails}>
        X
      </Link>
      {isLoading || !character ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>name - {character.name}</h2>
          <span>eye color - {character.eye_color}</span>
          <div>mass - {character.mass}</div>
          <div>skin color - {character.name}</div>
        </>
      )}
    </div>
  );
}
