import type { To } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/routes';

import styles from './StatusPage.module.scss';

type StatusPageProps = {
  title: string;
  text: string;
  linkText: string;
  linkTo?: To;
};

export function StatusPage({
  title,
  text,
  linkText,
  linkTo = ROUTES.home,
}: StatusPageProps) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <Link className={styles.link} to={linkTo}>
        {linkText}
      </Link>
    </main>
  );
}
