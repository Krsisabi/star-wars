import { useId, useState } from 'react';

import { useTheme } from '~/hooks/useTheme';

import styles from './ThemeSwitcher.module.scss';

// A 24×24 scene: the sun or the moon above a horizon at y = 17.
const CENTER = { x: 12, y: 9.5 };

const point = (angle: number, radius: number) =>
  `${(CENTER.x + radius * Math.cos(angle)).toFixed(2)} ${(
    CENTER.y +
    radius * Math.sin(angle)
  ).toFixed(2)}`;

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  return `M${point(angle, 5.4)}L${point(angle, 7.1)}`;
}).join('');

const sparkle = (x: number, y: number, size: number) =>
  `M${x} ${y - size}Q${x} ${y} ${x + size} ${y}Q${x} ${y} ${x} ${y + size}` +
  `Q${x} ${y} ${x - size} ${y}Q${x} ${y} ${x} ${y - size}Z`;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  // The sunset plays only after a click; on load the icon just shows
  // where the day is, instead of replaying the last change.
  const [hasToggled, setHasToggled] = useState(false);
  const id = useId().replace(/:/g, '');

  const label = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;

  return (
    <button
      type="button"
      className={styles.switcher}
      data-state={theme}
      data-animated={hasToggled || undefined}
      aria-label={label}
      title={label}
      onClick={() => {
        setHasToggled(true);
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      }}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <clipPath id={`${id}-sky`}>
            <rect width="24" height="17" />
          </clipPath>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" className={styles.glowStop} />
            <stop offset="1" className={styles.glowStop} stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-crescent`}>
            <rect width="24" height="24" fill="white" />
            <circle cx="14.8" cy="7.2" r="3.9" fill="black" />
          </mask>
        </defs>

        <g clipPath={`url(#${id}-sky)`}>
          <ellipse
            className={styles.glow}
            cx="12"
            cy="17.5"
            rx="11"
            ry="6"
            fill={`url(#${id}-glow)`}
          />
          <g className={styles.stars}>
            <path className={styles.star} d={sparkle(4.8, 5.4, 1.6)} />
            <path className={styles.star} d={sparkle(19.3, 3.8, 1.2)} />
            <circle className={styles.star} cx="19.6" cy="12.4" r="0.6" />
            <circle className={styles.star} cx="4.3" cy="11.6" r="0.5" />
          </g>
          <g className={styles.sun}>
            <g className={styles.rays}>
              <path className={styles.raysSpin} d={RAYS} />
            </g>
            <circle
              className={styles.sunCore}
              cx={CENTER.x}
              cy={CENTER.y}
              r="3.6"
            />
          </g>
          <g className={styles.moon}>
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="4.6"
              mask={`url(#${id}-crescent)`}
            />
          </g>
        </g>

        <path className={styles.horizon} d="M2.5 17.5H21.5" />
        <path className={styles.ground} d="M6.5 20.5H10M13 20.5H17.5" />
      </svg>
    </button>
  );
};
