import { ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { CharacterNormilized } from '~/types';
import styles from './Card.module.scss';

const localDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

type CardProps = {
  character: CharacterNormilized;
  activeElement?: string;
  setActiveElement?: React.Dispatch<React.SetStateAction<string>>;
  onSelect: (character: CharacterNormilized) => void;
  isSelected: boolean;
};

export function Card({
  activeElement,
  setActiveElement,
  onSelect,
  isSelected,
  character,
}: CardProps) {
  const router = useRouter();

  const { name, created, mass, skin_color, url } = character;

  const joinedDate = localDate.format(new Date(created));

  const urlObj = new URL(url);
  const id = urlObj.pathname.split('/')[3];

  const isActive = activeElement === id;

  const onClickHandler = (
    e: MouseEvent<HTMLLIElement> | ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    if (isActive) {
      setActiveElement?.('');
      router.push('/');
      return;
    }
    setActiveElement?.(id);
    const newQuery = { ...router.query, id };
    router.push({
      pathname: '/details/[id]',
      query: newQuery,
    });
  };

  return (
    <li
      className={clsx(styles.card, {
        [styles.active]: isActive,
      })}
      onClick={onClickHandler}
    >
      <h2 className={styles.title}>{name}</h2>
      <span>{joinedDate}</span>
      <div>mass - {mass}</div>
      <div>skin color - {skin_color}</div>
      <label
        className={styles.checkboxContainer}
        onClick={(e) => e.stopPropagation()}
      >
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
