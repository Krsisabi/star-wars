import { Link, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { CharacterNormalized } from '~/types';
import styles from './Card.module.scss';

const localDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

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

  const { id, name, created, mass, skin_color } = character;

  const joinedDate = localDate.format(new Date(created));

  // A second click on the open card closes it; the query stays either way.
  const query = searchParams.toString();
  const to = {
    pathname: isActive ? '/' : `/details/${id}`,
    search: query ? `?${query}` : '',
  };

  return (
    <li className={clsx(styles.card, { [styles.active]: isActive })}>
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
      <span className={styles.line}>{joinedDate}</span>
      <div className={styles.line}>mass - {mass}</div>
      <div className={styles.line}>skin color - {skin_color}</div>
      <label className={styles.checkboxContainer}>
        <span className={styles.checkboxLabel}>
          {isSelected ? 'Unselect' : 'Select'}
        </span>
        <input
          type="checkbox"
          checked={isSelected}
          className={styles.checkbox}
          onChange={() => onSelect(character)}
        />
      </label>
    </li>
  );
}
