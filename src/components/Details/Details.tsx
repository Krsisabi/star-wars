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
  const [character, setCharacters] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const fetchCharacter = useCallback(async () => {
    setIsLoading(true);
    const url = `${BASE_URL}${id}`;
    try {
      const res = await fetch(url);
      const data = (await res.json()) as Character;
      setCharacters(data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter, id]);

  const closeDetails =
    location.pathname
      .split('/')
      .filter((value) => !['details', id].includes(value))
      .join('/') +
    '/?' +
    searchParams.toString();

  if (isLoading || !character) return <div>Loading...</div>;

  const { name, eye_color, mass } = character;

  return (
    <div className={styles.details}>
      <Link className={styles.button} to={closeDetails}>
        X
      </Link>
      <h2>name - {name}</h2>
      <span>eye color - {eye_color}</span>
      <div>mass - {mass}</div>
      <div>skin color - {name}</div>
    </div>
  );
}
