import { useSearchContext } from '~/hooks';
import { Card } from './Card';
import styles from './List.module.scss';

export function List() {
  const { results } = useSearchContext();

  return (
    <ul className={styles.list}>
      {results.map((el) => (
        <Card key={el.name} {...el} data-testid="listItem" />
      ))}
    </ul>
  );
}
