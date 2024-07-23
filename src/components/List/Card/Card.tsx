import { MouseEvent } from 'react';
import { generatePath, useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Character } from '~/types';
import styles from './Card.module.scss';

const localDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

type CardProps = Character & {
  activeElement?: string;
  setActiveElement?: React.Dispatch<React.SetStateAction<string>>;
};

export function Card({
  name,
  created,
  mass,
  skin_color,
  url,
  activeElement,
  setActiveElement,
}: CardProps) {
  const navigate = useNavigate();

  const joinedDate = localDate.format(new Date(created));

  const urlObj = new URL(url);
  const id = urlObj.pathname.split('/')[3];

  const [searchParams] = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('id', id);

  const isActive = activeElement === id;

  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
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
    </li>
  );
}
