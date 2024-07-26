import { useCallback, useEffect, useRef } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { DetailsOutletContext } from '~/pages/Home';
import styles from './Details.module.scss';
import { useGetDetailsQuery } from '~/store/api/apiSlice';

export function Details() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { setActiveElement, wrapperRef } =
    useOutletContext<DetailsOutletContext>();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

  const { data: character, isLoading, error } = useGetDetailsQuery(id || '');

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
        <div>skin color - {character.name}</div>
      </>
    </div>
  );
}
