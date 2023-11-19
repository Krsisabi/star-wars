import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Character } from '~/types';
import { baseFetch } from '~/api/baseFetch';
import styles from './Details.module.scss';

export function Details() {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!id) return;
    const fetchCharacter = async () => {
      setIsLoading(true);
      try {
        const data = await baseFetch<Character>(id);
        setCharacter(data);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  return (
    <div className={styles.details}>
      <Link
        className={styles.button}
        to={{ pathname: `../`, search: searchParams.toString() }}
      >
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
