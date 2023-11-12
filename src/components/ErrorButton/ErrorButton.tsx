import { useState } from 'react';
import styles from './ErrorButton.module.scss';

export function ErrorButton() {
  const [error, setIsError] = useState(false);

  if (error) {
    throw new Error('Your bad =(');
  }

  return (
    <button className={styles.errorButton} onClick={() => setIsError(true)}>
      Generate error
    </button>
  );
}
