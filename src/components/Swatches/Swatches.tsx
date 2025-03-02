import { swatches } from '~/utils/character';

import styles from './Swatches.module.scss';

// A dot per colour in the value: "white, blue" gives two.
export function Swatches({ value }: { value: string }) {
  const colors = swatches(value);
  if (colors.length === 0) return null;

  return (
    <span className={styles.swatches} aria-hidden="true">
      {colors.map((color, i) => (
        <span
          key={i}
          className={styles.swatch}
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}
