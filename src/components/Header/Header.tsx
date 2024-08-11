import { Search } from '../Search';
import { ErrorButton } from '../ErrorButton';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <ErrorButton />
      <Search />
      <ThemeSwitcher />
    </header>
  );
}
