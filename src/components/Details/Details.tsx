import type { ReactNode, RefObject } from 'react';
import { useCallback, useRef } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { Avatar } from '~/components/Avatar';
import { Button } from '~/components/Button';
import { Swatches } from '~/components/Swatches';
import { useDismiss } from '~/hooks/useDismiss';
import { useSearchLink } from '~/hooks/useSearchLink';
import { ROUTES } from '~/routes';
import { useGetDetailsQuery } from '~/store/api/apiSlice';
import type { Character } from '~/types';
import { LOOKS, MEASURES, summary, toneStyle } from '~/utils/character';

import styles from './Details.module.scss';

// What the page around the panel hands it: the list's wrapper, where a
// click closes the panel.
export type DetailsOutletContext = {
  wrapperRef: RefObject<HTMLElement>;
};

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
  const characterId = Number(id);
  const { toPath } = useSearchLink();
  const { wrapperRef } = useOutletContext<DetailsOutletContext>();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLElement>(null);

  // currentData, not data: while the next character loads, the previous
  // one must not be shown under the new selection.
  const { currentData: character, error } = useGetDetailsQuery(id);

  const close = useCallback(() => {
    navigate(toPath(ROUTES.home), { replace: true });
  }, [navigate, toPath]);

  // A click on the list closes the panel, as Escape does.
  useDismiss(close, { area: wrapperRef, except: detailsRef });

  const title = character?.name ?? (error ? 'Not available' : 'Loading...');

  return (
    <>
      <div className={styles.backdrop} />
      <aside
        className={styles.details}
        style={toneStyle(characterId)}
        ref={detailsRef}
        aria-labelledby="details-title"
        aria-busy={!character && !error}
      >
        <header className={styles.header}>
          <Avatar
            id={characterId}
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
          <Button
            icon="cross"
            label="Close details"
            iconOnly
            className={styles.close}
            onClick={close}
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
