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
      <button
        type="button"
        className={styles.buttonDelete}
        onClick={handleUnselectAll}
      >
        {/* A phone keeps the selection to one line: icons, no words. */}
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M7 7l10 10M17 7 7 17" />
        </svg>
        <span className={styles.label}>Unselect all</span>
      </button>
      <ExportCSV
        data={selectedItems}
        fileName={`${selectedCount}_characters.csv`}
      />
    </div>
  );
}
