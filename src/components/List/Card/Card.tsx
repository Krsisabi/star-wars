import { ChangeEvent, MouseEvent } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { name, created, mass, skin_color, url } = character;

  const joinedDate = localDate.format(new Date(created));

  const urlObj = new URL(url);
  const id = urlObj.pathname.split('/')[3];

  const [searchParams] = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('id', id);

  const isActive = activeElement === id;

  const onClickHandler = (
    e: MouseEvent<HTMLLIElement> | ChangeEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    if (isActive) {
      setActiveElement?.('');
      navigate('..', { replace: true });
      return;
    }
    setActiveElement?.(id);
    navigate(
      `${generatePath('/details/:id', { id })}${searchParams ? `?${searchParams.toString()}` : ''}`,
      { replace: true }
    );
  };

  const onSelectHandler = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLSpanElement>
  ) => {
    onSelect(character);
    e.stopPropagation();
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
        <span className={styles.checkboxLabel} onClick={onSelectHandler}>
          {isSelected ? 'Unselect' : 'Select'}
        </span>
        <input
          type="checkbox"
          checked={isSelected}
          className={styles.checkbox}
          onChange={onSelectHandler}
        />
      </label>
    </li>
  );
}
