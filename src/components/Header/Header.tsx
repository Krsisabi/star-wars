import { memo } from 'react';
import { Search } from '../Search';
import styles from './Header.module.scss';

export const Header = memo(function Header() {
  return (
    <header className={styles.header}>
      <Search />
    </header>
  );
});
