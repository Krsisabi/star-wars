import { Button } from '~/components/Button';
import { ExportCSV } from '~/components/ExportCSV';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { clearSelection, selectSelected } from '~/store/selectionSlice';

import styles from './Flyout.module.scss';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelected);
  const count = selected.length;

  const unselectAll = () => {
    dispatch(clearSelection());
  };

  if (count === 0) return null;

  return (
    <div className={styles.flyout}>
      <p className={styles.count} role="status">
        {count} {count === 1 ? 'item' : 'items'} selected
      </p>
      <Button icon="cross" label="Unselect all" onClick={unselectAll} />
      <ExportCSV data={selected} fileName={`${count}_characters.csv`} />
    </div>
  );
}
