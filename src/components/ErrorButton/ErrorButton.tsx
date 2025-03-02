import { useEffect, useState } from 'react';
import styles from './ErrorButton.module.scss';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  const throwError = () => setHasError(true);

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  return (
    <button type="button" className={styles.button} onClick={throwError}>
      {/* A phone shows only the sign, beside the pagination. */}
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
      </svg>
      <span className={styles.label}>Generate error</span>
    </button>
  );
}
