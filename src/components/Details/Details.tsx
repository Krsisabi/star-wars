import { useCallback, useEffect, useRef } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { DetailsOutletContext } from '~/pages/Home';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import { Character } from '~/types';
import styles from './Details.module.scss';

const withUnit = (value: string, unit: string) =>
  /^[\d.,]+$/.test(value) ? `${value} ${unit}` : value;

const FIELDS: [label: string, format: (character: Character) => string][] = [
  ['Height', (character) => withUnit(character.height, 'cm')],
  ['Mass', (character) => withUnit(character.mass, 'kg')],
  ['Birth year', (character) => character.birth_year],
  ['Gender', (character) => character.gender],
  ['Hair color', (character) => character.hair_color],
  ['Skin color', (character) => character.skin_color],
  ['Eye color', (character) => character.eye_color],
];

export function Details() {
  const { id = '' } = useParams();
  const [searchParams] = useSearchParams();
  const { wrapperRef } = useOutletContext<DetailsOutletContext>();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLElement>(null);

  // currentData, not data: while the next character loads, the previous
  // one must not be shown under the new selection.
  const { currentData: character, error } = useGetDetailsQuery(id);

  const closeHandler = useCallback(() => {
    navigate(
      { pathname: `..`, search: searchParams.toString() },
      { replace: true }
    );
  }, [navigate, searchParams]);

  useEffect(() => {
    // A click on the list closes the panel, unless it lands on a control
    // that has a job of its own (another card, a checkbox, a page link).
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (
        wrapperRef.current?.contains(target) &&
        !detailsRef.current?.contains(target) &&
        !target.closest('a, button, input, label')
      )
        closeHandler();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeHandler();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [wrapperRef, closeHandler]);

  const title = character?.name ?? (error ? 'Not available' : 'Loading...');

  return (
    <aside
      className={styles.details}
      ref={detailsRef}
      aria-labelledby="details-title"
      aria-busy={!character && !error}
    >
      <header className={styles.header}>
        <h2 id="details-title" className={styles.title}>
          {title}
        </h2>
        <button
          type="button"
          className={styles.close}
          onClick={closeHandler}
          aria-label="Close details"
        >
          &times;
        </button>
      </header>
      {error ? (
        <p>Something went wrong...</p>
      ) : (
        <dl className={styles.fields}>
          {FIELDS.map(([label, format]) => (
            <div key={label} className={styles.field}>
              <dt>{label}</dt>
              <dd>
                {character ? (
                  format(character)
                ) : (
                  <span className={styles.placeholder} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </aside>
  );
}
