import { ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage, LSKey } from '~/hooks';
import styles from './Search.module.scss';
import { useLazyGetCharactersQuery } from '~/store/api/apiSlice';

type FormFields = {
  search: HTMLInputElement;
};

export function Search() {
  const router = useRouter();
  const { value, setValue } = useLocalStorage<string>(LSKey);

  const [triggerGetCharacters] = useLazyGetCharactersQuery();

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement & FormFields>) => {
      event.preventDefault();

      const text = event.currentTarget.search?.value.trim();

      router.push({
        pathname: router.pathname,
        query: { search: text, page: '1' },
      });

      setValue(text);
      triggerGetCharacters({ name: text, page: 1 });
    },
    [router, setValue, triggerGetCharacters]
  );

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
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;
