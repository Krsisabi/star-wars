import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteAllItems } from '~/store/charactersSlice';
import { ExportCSV } from '../ExportCSV';
import styles from './Flyout.module.scss';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedCharacters);
  const selectedCount = selectedItems.length;

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
      <ExportCSV
        data={selectedItems}
        fileName={`${selectedCount}_characters.csv`}
      />
    </div>
  );
}
