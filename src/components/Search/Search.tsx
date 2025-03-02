import { FormEvent, useState } from 'react';
import { useSearchQuery } from '~/hooks';
import styles from './Search.module.scss';

export function Search() {
  const { search, submitSearch } = useSearchQuery();
  const [draft, setDraft] = useState(search);
  const [shownSearch, setShownSearch] = useState(search);

  // The address can change without this form (Back, a shared link):
  // the field follows it, so it never shows a term the list is not about.
  if (search !== shownSearch) {
    setShownSearch(search);
    setDraft(search);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDraft(draft.trim());
    submitSearch(draft);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit} role="search">
      {/* The label makes the icon a part of the field: a click on it focuses the input. */}
      <label className={styles.field}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 20 20" />
        </svg>
        <input
          className={styles.textField}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          type="text"
          name="search"
          placeholder="Search..."
          aria-label="Search characters by name"
        />
      </label>
      <button className={styles.button}>Search</button>
    </form>
  );
}
