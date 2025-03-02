import { Button } from '~/components/Button';
import { ExportCSV } from '~/components/ExportCSV';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { deleteAllItems } from '~/store/charactersSlice';

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
      <p className={styles.count} role="status">
        {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
      </p>
      <Button icon="cross" label="Unselect all" onClick={handleUnselectAll} />
      <ExportCSV
        data={selectedItems}
        fileName={`${selectedCount}_characters.csv`}
      />
    </div>
  );
}
