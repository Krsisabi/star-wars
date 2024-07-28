import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { toggleChecked } from '~/store/charactersSlice';
import { CharacterNormilized } from '~/types';
import { Card } from './Card';
import styles from './List.module.scss';

type ListProps = {
  data?: CharacterNormilized[];
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
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector(
    (state) => state.selectedCharacters
  );

  if (!data || !!error) return <div>Something went wrong</div>;

  const isCharacterSelected = (id: number) =>
    selectedCharacters.some((character) => character.id === id);

  const onSelect = (character: CharacterNormilized) => {
    dispatch(toggleChecked(character));
  };

  return (
    <ul className={styles.list}>
      {data.map((el) => {
        return (
          <Card
            key={el.name}
            character={el}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
            isSelected={isCharacterSelected(el.id)}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
}
