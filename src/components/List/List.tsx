import { Card } from './Card';
import type { Character } from '~/types';
import styles from './List.module.scss';

type ListProps = {
  data: Character[];
  activeElement?: string;
  setActiveElement?: React.Dispatch<React.SetStateAction<string>>;
};

export function List({ data, activeElement, setActiveElement }: ListProps) {
  return (
    <ul className={styles.list}>
      {data.length === 0 ? (
        <h2>No such characters</h2>
      ) : (
        data.map((el) => (
          <Card
            key={el.name}
            {...el}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        ))
      )}
    </ul>
  );
}
