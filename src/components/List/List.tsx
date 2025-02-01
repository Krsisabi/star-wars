import { Card } from './Card';
import type { Character } from '~/types';
import styles from './List.module.scss';

type ListProps = {
  data: Character[];
};

export function List({ data }: ListProps) {
  return (
    <div className={styles.list}>
      {data.length === 0 ? (
        <h2>No such characters</h2>
      ) : (
        data.map((el) => <Card key={el.name} {...el} />)
      )}
    </div>
  );
}
