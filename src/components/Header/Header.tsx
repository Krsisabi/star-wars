import { Search } from '../Search';
import { ErrorButton } from '../ErrorButton';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <ErrorButton />
      <Search />
    </header>
  );
}
