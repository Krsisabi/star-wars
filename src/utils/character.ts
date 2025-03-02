import { Character } from '~/types';

const UNKNOWN = new Set(['n/a', 'none', 'unknown']);

export const isKnown = (value: string) => !UNKNOWN.has(value);

export const withUnit = (value: string, unit: string) =>
  /^[\d.,]+$/.test(value) ? `${value} ${unit}` : value;

// "male · 19BBY". Droids have no gender, some characters no birth year.
export const summary = ({ gender, birth_year }: Character) =>
  [gender, birth_year].filter(isKnown).join(' · ');

// "Luke Skywalker" → LS, "C-3PO" → C3, "R2-D2" → R2.
export const initials = (name: string) => {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1)
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  return name
    .replace(/[^\p{L}\p{N}]/gu, '')
    .slice(0, 2)
    .toUpperCase();
};

// The golden angle spreads neighbouring ids far apart on the colour wheel.
export const hueOf = (id: number) => Math.round((id * 137.508) % 360);

// Every colour word SWAPI uses for hair, skin and eyes.
const COLORS: Record<string, string> = {
  auburn: '#922724',
  black: '#1c1c1c',
  blond: '#e6c46a',
  blonde: '#e6c46a',
  blue: '#3d7be0',
  'blue-gray': '#6d7f95',
  brown: '#6f4a2f',
  dark: '#4a3326',
  fair: '#f1d2b6',
  gold: '#d4a531',
  green: '#3f9a4b',
  grey: '#9aa0a6',
  hazel: '#8a7236',
  light: '#eecfb4',
  metal: '#9ea4ab',
  orange: '#ec8a2d',
  pale: '#f3e4d7',
  pink: '#ee9bb3',
  red: '#d23a2f',
  silver: '#c3c7cd',
  tan: '#c8a079',
  white: '#f4f4f4',
  yellow: '#f0c93a',
};

// "white, blue" gives two swatches; "mottled green" and "green-tan"
// fall back to the first word the table knows.
export const swatches = (value: string) =>
  value
    .split(/,\s*/)
    .map(
      (part) =>
        COLORS[part] ??
        part
          .split(/[\s-]/)
          .map((word) => COLORS[word])
          .find(Boolean)
    )
    .filter((color): color is string => Boolean(color));
