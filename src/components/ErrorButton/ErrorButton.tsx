import { useEffect, useState } from 'react';
import styles from './ErrorButton.module.scss';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  const throwError = () => setHasError(true);

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  return (
    <button className={styles.button} onClick={throwError}>
      Generate error
    </button>
  );
}
