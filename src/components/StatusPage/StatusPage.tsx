import { Link } from 'react-router-dom';

import { ROUTES } from '~/routes';

import styles from './StatusPage.module.scss';

type StatusPageProps = {
  title: string;
  text: string;
  homeLink: string;
};

export function StatusPage({ title, text, homeLink }: StatusPageProps) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <Link className={styles.link} to={ROUTES.home}>
        {homeLink}
      </Link>
    </main>
  );
}
