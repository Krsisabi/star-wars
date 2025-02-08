import { ChangeEvent, memo } from 'react';
import { useLocalStorage } from '~/hooks';
import { Search } from '../Search';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';
import styles from './Header.module.scss';

type HeaderProps = {
  fetchCharacters: (character: string) => Promise<void>;
};

export const Header = memo(function Header({ fetchCharacters }: HeaderProps) {
  const [value, setValue] = useLocalStorage<string>(
    STORAGE_KEYS.searchValue,
    ''
  );

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <header className={styles.header}>
      <Search
        value={value}
        onChange={searchInputHandler}
        onSubmit={fetchCharacters}
      />
    </header>
  );
});
