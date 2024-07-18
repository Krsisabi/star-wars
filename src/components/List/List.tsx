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
      {data.map((el) => {
        return (
          <Card
            key={el.name}
            {...el}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        );
      })}
    </ul>
  );
}
