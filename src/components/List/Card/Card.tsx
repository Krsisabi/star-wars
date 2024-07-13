import { Link, generatePath } from 'react-router-dom';
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

  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <span>{joinedDate}</span>
      <div>mass - {mass}</div>
      <div>skin color - {skin_color}</div>
      <Link
        className={styles.link}
        to={generatePath('/search/:id', {
          id: username,
        })}
      />
    </div>
  );
}
