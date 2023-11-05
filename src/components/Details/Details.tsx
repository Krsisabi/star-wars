// import { Character } from '../../types';
import { useParams } from 'react-router';
import styles from './Details.module.scss';
import { useEffect, useState } from 'react';
import { Character } from '../../types';

const BASE_URL = 'https://swapi.dev/api/people/';

export function Details(/* { name, mass, skin_color }: Character */) {
  const [character, setCharacters] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
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
  };

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
