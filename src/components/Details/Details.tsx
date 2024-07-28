import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { BASE_URL, DetailsOutletContext } from '~/pages/Home';
import { Character } from '~/types';
import styles from './Details.module.scss';

export function Details() {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { setActiveElement, wrapperRef } =
    useOutletContext<DetailsOutletContext>();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

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

  const closeHandler = useCallback(() => {
    setActiveElement('');
    navigate(
      { pathname: `..`, search: searchParams.toString() },
      { replace: true }
    );
  }, [navigate, searchParams, setActiveElement]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        wrapperRef.current?.contains(e.target as Node) &&
        !detailsRef.current?.contains(e.target as Node)
      )
        closeHandler();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef, closeHandler]);

  if (isLoading || !character)
    return (
      <div className={styles.details}>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className={styles.details} ref={detailsRef}>
      <button className={styles.button} onClick={closeHandler}>
        X
      </button>
      <>
        <h2>name - {character.name}</h2>
        <span>eye color - {character.eye_color}</span>
        <div>mass - {character.mass}</div>
        <div>skin color - {character.name}</div>
      </>
    </div>
  );
}
