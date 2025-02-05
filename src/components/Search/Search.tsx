import { ChangeEventHandler } from 'react';
import styles from './Search.module.scss';
import { useLocalStorage } from '~/hooks';
import { STORAGE_KEYS } from '~/hooks/useLocalStorage';

type FormFields = {
  search: HTMLInputElement;
};

type SearchProps = {
  onSubmit: (text: string) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export function Search({ onSubmit, value, onChange }: SearchProps) {
  const [, setValue] = useLocalStorage(STORAGE_KEYS.searchValue, '');

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement & FormFields>
  ) => {
    event.preventDefault();

    const text = event.currentTarget.search.value.trim();

    setValue(text);
    onSubmit(text);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.textField}
        value={value}
        onChange={onChange}
        type="text"
        name="search"
        placeholder="Search..."
      />
      <button className={styles.button}>Search</button>
    </form>
  );
}
