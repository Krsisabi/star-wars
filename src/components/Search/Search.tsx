import { useSearchContext } from '~/hooks';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useState } from 'react';
import styles from './Search.module.scss';

type FormFields = {
  search: HTMLInputElement;
};

type SearchProps = {
  onSubmit: (text: string) => void;
};

export function Search({ onSubmit }: SearchProps) {
  const {
    searchValue,
    setCurrentPage,
    setSearchValue: setSearchValueGlobal,
  } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValueLocal, setSearchValueLocal] = useState(searchValue);

  const setValueCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValueLocal(e.target.value);
  }, []);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement & FormFields>
  ) => {
    event.preventDefault();

    searchParams.set('search', searchValueLocal || '');
    searchParams.set('page', '1');

    setCurrentPage(1);
    setSearchValueGlobal(searchValueLocal);
    setSearchParams(searchParams);

    const text = event.currentTarget.search.value.trim();
    onSubmit(text);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.textField}
        value={searchValueLocal}
        onChange={setValueCallback}
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
