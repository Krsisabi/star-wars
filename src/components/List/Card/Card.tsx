import { Link, generatePath, useSearchParams } from 'react-router-dom';
import { Character } from '~/types';
import styles from './Card.module.scss';

const localDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function Card({ name, created, mass, skin_color, url }: Character) {
  const joinedDate = localDate.format(new Date(created));

  const urlObj = new URL(url);
  const username = urlObj.pathname.split('/')[3];

  const [searchParams] = useSearchParams();

  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('id', username);

  const newPath = `${generatePath('/details/:id', { id: username })}${searchParams ? `?${searchParams.toString()}` : ''}`;

  return (
    <li className={styles.card}>
      <h2>{name}</h2>
      <span>{joinedDate}</span>
      <div>mass - {mass}</div>
      <div>skin color - {skin_color}</div>
      <Link className={styles.link} to={newPath} />
    </li>
  );
}
