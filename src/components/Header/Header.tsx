import { ChangeEvent, memo } from 'react';
import { LSKey, useLocalStorage } from '~/hooks';
import { Search } from '../Search';
import { ErrorButton } from '../ErrorButton';
import styles from './Header.module.scss';

type HeaderProps = {
  fetchCharacters: (character: string) => Promise<void>;
};

export const Header = memo(function Header({ fetchCharacters }: HeaderProps) {
  const { value, setValue } = useLocalStorage<string>(LSKey);

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <header className={styles.header}>
      <ErrorButton />
      <Search
        value={value}
        onChange={searchInputHandler}
        onSubmit={fetchCharacters}
      />
    </header>
  );
});
