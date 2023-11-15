import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.error} id="error-page">
      <h1>Oops!</h1>
      <div>Page you requested doesn&apos;t exist =(</div>;
    </div>
  );
}
