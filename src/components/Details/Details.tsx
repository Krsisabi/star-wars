import { useCallback, useEffect, useState } from 'react';
import { Character } from '~/types';
import styles from './Details.module.scss';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '~/pages/Home';

export function Details() {
  const [character, setCharacters] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

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

  return (
    <div className={styles.details}>
      <Link className={styles.button} to={'/'}>
        X
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>name - {character?.name}</h2>
          <span>eye color - {character?.eye_color}</span>
          <div>mass - {character?.mass}</div>
          <div>skin color - {character?.name}</div>
        </>
      )}
    </div>
  );
}
