import { memo } from 'react';

import { Search } from '~/components/Search';
import { ThemeSwitcher } from '~/components/ThemeSwitcher';

import styles from './Header.module.scss';

export const Header = memo(function Header() {
  return (
    <header className={styles.header}>
      <Search />
      <ThemeSwitcher />
    </header>
  );
});
