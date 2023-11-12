import { useSearch } from '~/hooks';
import styles from './Search.module.scss';

type FormFields = {
  search: HTMLInputElement;
};

type SearchProps = {
  onSubmit: (text: string) => void;
};

export function Search({ onSubmit }: SearchProps) {
  const { searchValue: value, setSearchInputValue } = useSearch();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement & FormFields>
  ) => {
    event.preventDefault();

    const text = event.currentTarget.search.value;
    localStorage.setItem('searchValue', text);

    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.textField}
        value={value}
        onChange={setSearchInputValue}
        type="text"
        name="search"
        placeholder="Search..."
      />
      <button className={styles.button}>Search</button>
    </form>
  );
}
