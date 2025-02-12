import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteAllItems } from '~/store/charactersSlice';
import styles from './Flyout.module.scss';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedCharacters);
  const selectedCount = Object.keys(selectedItems).length;

  const handleUnselectAll = () => {
    dispatch(deleteAllItems());
  };

  if (selectedCount === 0) return null;

  return (
    <div className={styles.flyout}>
      <h4>items selected: {selectedCount}</h4>
      <button className={styles.buttonDelete} onClick={handleUnselectAll}>
        Unselect all
      </button>
    </div>
  );
}
