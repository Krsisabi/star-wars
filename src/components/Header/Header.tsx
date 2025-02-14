import { memo } from 'react';
import { Search } from '../Search';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './Header.module.scss';

export const Header = memo(function Header() {
  return (
    <header className={styles.header}>
      <Search />
      <ThemeSwitcher />
    </header>
  );
});
