import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Forms</h1>
      <div className={styles.wrapper}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/uncontrolled-form">
          Uncontrolled Form
        </Link>
        <Link className={styles.link} to="/react-hook-form">
          React Hook Form
        </Link>
      </div>
    </header>
  );
};
