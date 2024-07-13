import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Character } from '~/types';
import styles from './Details.module.scss';

const BASE_URL = 'https://swapi.dev/api/people/';

export function Details() {
  const [character, setCharacters] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchCharacter = useCallback(async () => {
    setIsLoading(true);
    const url = `${BASE_URL}/${id}`;
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
