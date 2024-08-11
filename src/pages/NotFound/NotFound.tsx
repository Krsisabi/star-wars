import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist.
      </p>
      <Link className={styles.link} to="/">
        Go to Home
      </Link>
    </div>
  );
};
