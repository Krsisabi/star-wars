import { Link, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { CharacterNormalized } from '~/types';
import { isKnown, summary, withUnit } from '~/utils/character';
import { Avatar } from '../../Avatar';
import { Swatches } from '../../Swatches';
import styles from './Card.module.scss';

export type CardProps = {
  character: CharacterNormalized;
  isActive?: boolean;
  onSelect: (character: CharacterNormalized) => void;
  isSelected: boolean;
};

export function Card({
  isActive = false,
  onSelect,
  isSelected,
  character,
}: CardProps) {
  const [searchParams] = useSearchParams();

  const { id, name, height, mass } = character;
  const facts = summary(character);
  // "blond hair, fair skin, blue eyes", without the parts SWAPI lacks.
  const looks = [
    ['hair', character.hair_color],
    ['skin', character.skin_color],
    ['eyes', character.eye_color],
  ].filter(([, value]) => isKnown(value));

  // A second click on the open card closes it; the query stays either way.
  const query = searchParams.toString();
  const to = {
    pathname: isActive ? '/' : `/details/${id}`,
    search: query ? `?${query}` : '',
  };

  return (
    <li className={clsx(styles.card, { [styles.active]: isActive })}>
      <Avatar id={id} name={name} className={styles.avatar} />
      <h2 className={styles.title} title={name}>
        <Link
          to={to}
          replace
          className={styles.link}
          aria-current={isActive || undefined}
        >
          {name}
        </Link>
      </h2>
      <div className={styles.meta}>
        {facts && <p className={styles.summary}>{facts}</p>}
        {looks.length > 0 && (
          <p className={styles.looks}>
            {looks.map(([part, value], i) => (
              <span key={part} className={styles.look}>
                {i > 0 && <span className="visually-hidden">, </span>}
                <Swatches value={value} />
                {value} {part}
              </span>
            ))}
          </p>
        )}
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Height</dt>
            <dd>{withUnit(height, 'cm')}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Mass</dt>
            <dd>{withUnit(mass, 'kg')}</dd>
          </div>
        </dl>
      </div>
      <label
        className={styles.select}
        title={isSelected ? 'Unselect' : 'Select'}
      >
        <input
          type="checkbox"
          checked={isSelected}
          className={styles.checkbox}
          onChange={() => onSelect(character)}
        />
        <span className="visually-hidden">Select {name}</span>
      </label>
    </li>
  );
}
