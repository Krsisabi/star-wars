import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Avatar } from '~/components/Avatar';
import { Swatches } from '~/components/Swatches';
import { useSearchLink } from '~/hooks/useSearchLink';
import { detailsPath, ROUTES } from '~/routes';
import type { CharacterNormalized } from '~/types';
import {
  isKnown,
  LOOKS,
  MEASURES,
  summary,
  toneStyle,
} from '~/utils/character';

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
  const { toPath } = useSearchLink();

  const { id, name } = character;
  const facts = summary(character);
  const looks = LOOKS.map(({ label, value }) => [
    label.toLowerCase(),
    value(character),
  ]).filter(([, value]) => isKnown(value));

  const to = toPath(isActive ? ROUTES.home : detailsPath(id));

  return (
    <li
      className={clsx(styles.card, { [styles.active]: isActive })}
      style={toneStyle(id)}
    >
      <div className={styles.body}>
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
          <p className={styles.summary}>{facts}</p>
          <p className={styles.looks}>
            {looks.map(([part, value], i) => (
              <span key={part} className={styles.look}>
                {i > 0 && <span className="visually-hidden">, </span>}
                <Swatches value={value} />
                {value} {part}
              </span>
            ))}
          </p>
          <dl className={styles.stats}>
            {MEASURES.map(({ label, value }) => (
              <div key={label} className={styles.stat}>
                <dt>{label}</dt>
                <dd>{value(character)}</dd>
              </div>
            ))}
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
      </div>
    </li>
  );
}
