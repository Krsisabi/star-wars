import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { toggleChecked } from '~/store/charactersSlice';
import { CharacterNormalized } from '~/types';
import { Card } from './Card';
import styles from './List.module.scss';

const PAGE_SIZE = 10;

type ListProps = {
  data?: CharacterNormalized[];
  activeId?: string;
  error?: FetchBaseQueryError | SerializedError;
  isRefreshing?: boolean;
};

export function List({ data, activeId, error, isRefreshing }: ListProps) {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters
  );

  if (data && data.length === 0)
    return <p className={styles.message}>No such characters =(</p>;
  if (!data || !!error)
    return <p className={styles.message}>Something went wrong</p>;

  const isCharacterSelected = (id: number) =>
    selectedCharacters.some((character) => character.id === id);

  const onSelect = (character: CharacterNormalized) => {
    dispatch(toggleChecked(character));
  };

  // While the next page loads, the current one stays in place, dimmed,
  // instead of collapsing into a loader and jumping back.
  return (
    <ul
      className={clsx(styles.list, { [styles.refreshing]: isRefreshing })}
      aria-busy={isRefreshing || undefined}
    >
      {data.map((el) => {
        return (
          <Card
            key={el.id}
            character={el}
            isActive={activeId === String(el.id)}
            isSelected={isCharacterSelected(el.id)}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
}

export function ListSkeleton() {
  return (
    <div>
      <p className="visually-hidden" role="status">
        Loading...
      </p>
      <ul className={styles.list} aria-hidden="true">
        {Array.from({ length: PAGE_SIZE }, (_, i) => (
          <li key={i} className={styles.placeholder} />
        ))}
      </ul>
    </div>
  );
}
