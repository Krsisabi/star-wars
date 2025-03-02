import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Avatar } from '~/components/Avatar';
import { Button } from '~/components/Button';
import { Swatches } from '~/components/Swatches';
import type { DetailsOutletContext } from '~/pages/Home';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import type { Character } from '~/types';
import { LOOKS, MEASURES, summary, toneStyle } from '~/utils/character';

import styles from './Details.module.scss';

type Field = {
  label: string;
  value: (character: Character) => ReactNode;
};

const APPEARANCE: Field[] = LOOKS.map(({ label, value }) => ({
  label,
  value: (character) => (
    <>
      <Swatches value={value(character)} />
      {value(character)}
    </>
  ),
}));

// The lists are links to other resources; their length needs no request.
const APPEARS_IN: Field[] = [
  { label: 'Films', value: ({ films }) => films.length },
  { label: 'Starships', value: ({ starships }) => starships.length },
  { label: 'Vehicles', value: ({ vehicles }) => vehicles.length },
];

type FieldsProps = {
  fields: Field[];
  character?: Character;
  className: string;
};

// Until the data comes, every value keeps its place with a placeholder
// of the same height, so the panel does not grow when it arrives.
function Fields({ fields, character, className }: FieldsProps) {
  return (
    <dl className={className}>
      {fields.map(({ label, value }) => (
        <div key={label} className={styles.field}>
          <dt>{label}</dt>
          <dd>
            {character ? (
              value(character)
            ) : (
              <span className={styles.placeholder} />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

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
    <>
      <div className={styles.backdrop} />
      <aside
        className={styles.details}
        style={toneStyle(Number(id))}
        ref={detailsRef}
        aria-labelledby="details-title"
        aria-busy={!character && !error}
      >
        <header className={styles.header}>
          <Avatar
            id={Number(id)}
            name={character?.name}
            size="large"
            className={styles.portrait}
          />
          <div className={styles.heading}>
            <h2 id="details-title" className={styles.title}>
              {title}
            </h2>
            {character && (
              <p className={styles.summary}>{summary(character)}</p>
            )}
          </div>
          {/* A drawn cross: the × glyph sits wherever the font puts it. */}
          <Button
            icon="cross"
            label="Close details"
            iconOnly
            className={styles.close}
            onClick={closeHandler}
          />
        </header>
        {error ? (
          <p>Something went wrong...</p>
        ) : (
          <>
            <Fields
              fields={MEASURES}
              character={character}
              className={styles.tiles}
            />
            <section className={styles.section} aria-labelledby="appearance">
              <h3 id="appearance" className={styles.sectionTitle}>
                Appearance
              </h3>
              <Fields
                fields={APPEARANCE}
                character={character}
                className={styles.rows}
              />
            </section>
            <section className={styles.section} aria-labelledby="appears-in">
              <h3 id="appears-in" className={styles.sectionTitle}>
                Appears in
              </h3>
              <Fields
                fields={APPEARS_IN}
                character={character}
                className={styles.counts}
              />
            </section>
          </>
        )}
      </aside>
    </>
  );
}
