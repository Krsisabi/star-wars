import { ChangeEvent } from 'react';
import { useLocalStorage } from '~/hooks';
import styles from './Search.module.scss';
import { useLazyGetCharactersQuery } from '~/store/api/apiSlice';
import { useSearchParams } from 'react-router-dom';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';

type FormFields = {
  search: HTMLInputElement;
};

export function Search() {
  const [value, setValue] = useLocalStorage(STORAGE_KEYS.searchValue, '');

  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const [triggerGetCharacters] = useLazyGetCharactersQuery();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement & FormFields>
  ) => {
    event.preventDefault();

    const text = event.currentTarget.search?.value.trim();
    searchParams.set('search', text);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setValue(text);
    triggerGetCharacters({ name: text, page: 1 });
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.textField}
        value={value}
        onChange={searchInputHandler}
        type="text"
        name="search"
        placeholder="Search..."
      />
      <button className={styles.button}>Search</button>
    </form>
  );
}
