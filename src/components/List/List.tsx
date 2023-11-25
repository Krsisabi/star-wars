import { useSearchContext } from '~/hooks';
import { Card } from './Card';
import styles from './List.module.scss';

export function List() {
  const { results } = useSearchContext();

  if (!results.length)
    return <p className={styles.message}>Nothing found...</p>;

  return (
    <ul className={styles.list}>
      {results.map((el) => (
        <Card key={el.name} {...el} data-testid="listItem" />
      ))}
    </ul>
  );
}
