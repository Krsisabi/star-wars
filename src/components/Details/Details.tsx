import { ReactNode, useCallback, useEffect, useRef } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { DetailsOutletContext } from '~/pages/Home';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import { Character } from '~/types';
import { summary, withUnit } from '~/utils/character';
import { Avatar } from '../Avatar';
import { Swatches } from '../Swatches';
import styles from './Details.module.scss';

type Field = [label: string, render: (character: Character) => ReactNode];

const STATS: Field[] = [
  ['Height', (character) => withUnit(character.height, 'cm')],
  ['Mass', (character) => withUnit(character.mass, 'kg')],
];

const withSwatches = (value: string) => (
  <>
    <Swatches value={value} />
    {value}
  </>
);

const APPEARANCE: Field[] = [
  ['Hair', (character) => withSwatches(character.hair_color)],
  ['Skin', (character) => withSwatches(character.skin_color)],
  ['Eyes', (character) => withSwatches(character.eye_color)],
];

// The lists are links to other resources; their length needs no request.
const APPEARS_IN: Field[] = [
  ['Films', (character) => character.films.length],
  ['Starships', (character) => character.starships.length],
  ['Vehicles', (character) => character.vehicles.length],
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

  // Until the data comes, every value keeps its place with a placeholder
  // of the same height, so the panel does not grow when it arrives.
  const renderFields = (fields: Field[], className: string) => (
    <dl className={className}>
      {fields.map(([label, render]) => (
        <div key={label} className={styles.field}>
          <dt>{label}</dt>
          <dd>
            {character ? (
              render(character)
            ) : (
              <span className={styles.placeholder} />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <aside
      className={styles.details}
      ref={detailsRef}
      aria-labelledby="details-title"
      aria-busy={!character && !error}
    >
      <header className={styles.header}>
        {character ? (
          <Avatar id={Number(id)} name={character.name} size="large" />
        ) : (
          <span className={styles.avatarPlaceholder} />
        )}
        <div className={styles.heading}>
          <h2 id="details-title" className={styles.title}>
            {title}
          </h2>
          {character && <p className={styles.summary}>{summary(character)}</p>}
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={closeHandler}
          aria-label="Close details"
        >
          {/* A drawn cross: the × glyph sits wherever the font puts it. */}
          <svg
            className={styles.closeIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 7l10 10M17 7 7 17" />
          </svg>
        </button>
      </header>
      {error ? (
        <p>Something went wrong...</p>
      ) : (
        <>
          {renderFields(STATS, styles.tiles)}
          <section className={styles.section} aria-labelledby="appearance">
            <h3 id="appearance" className={styles.sectionTitle}>
              Appearance
            </h3>
            {renderFields(APPEARANCE, styles.rows)}
          </section>
          <section className={styles.section} aria-labelledby="appears-in">
            <h3 id="appears-in" className={styles.sectionTitle}>
              Appears in
            </h3>
            {renderFields(APPEARS_IN, styles.counts)}
          </section>
        </>
      )}
    </aside>
  );
}
