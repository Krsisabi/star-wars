import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import styles from './Details.module.scss';

export function Details() {
  const router = useRouter();
  const { characterId } = router.query;
  const detailsRef = useRef<HTMLDivElement>(null);

  const {
    data: character,
    isLoading,
    error,
  } = useGetDetailsQuery(characterId as string);

  const closeHandler = useCallback(() => {
    router.push(
      {
        pathname: '/',
        query: router.query,
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(e.target as Node)
      ) {
        closeHandler();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [closeHandler]);

  if (isLoading || !character)
    return (
      <div className={styles.details}>
        <div>Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className={styles.details}>
        <div>Something went wrong...</div>
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
        <div>skin color - {character.skin_color}</div>
      </>
    </div>
  );
}
