import { Card } from './Card';
import type { Character } from '~/types';
import styles from './List.module.scss';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

type ListProps = {
  data?: Character[];
  activeElement?: string;
  setActiveElement?: React.Dispatch<React.SetStateAction<string>>;
  error?: FetchBaseQueryError | SerializedError;
};

export function List({
  data,
  activeElement,
  setActiveElement,
  error,
}: ListProps) {
  if (!data || !!error) return <div>Something went wrong</div>;

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
