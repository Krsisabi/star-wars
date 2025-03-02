import type { CSSProperties } from 'react';

import type { Character } from '~/types';

const UNKNOWN = new Set(['n/a', 'none', 'unknown']);

export const isKnown = (value: string) => !UNKNOWN.has(value);

export const withUnit = (value: string, unit: string) =>
  /^[\d.,]+$/.test(value) ? `${value} ${unit}` : value;

type Fact = {
  label: string;
  value: (character: Character) => string;
};

export const MEASURES: Fact[] = [
  { label: 'Height', value: ({ height }) => withUnit(height, 'cm') },
  { label: 'Mass', value: ({ mass }) => withUnit(mass, 'kg') },
];

export const LOOKS: Fact[] = [
  { label: 'Hair', value: ({ hair_color }) => hair_color },
  { label: 'Skin', value: ({ skin_color }) => skin_color },
  { label: 'Eyes', value: ({ eye_color }) => eye_color },
];

export const summary = ({ gender, birth_year }: Character) =>
  [gender, birth_year].filter(isKnown).join(' · ');

export const initials = (name: string) => {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length > 1)
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  return name
    .replace(/[^\p{L}\p{N}]/gu, '')
    .slice(0, 2)
    .toUpperCase();
};

const GOLDEN_ANGLE = 137.508;

const hueOf = (id: number) => Math.round((id * GOLDEN_ANGLE) % 360);

export const toneStyle = (id: number) =>
  ({ '--hue': hueOf(id) }) as CSSProperties;

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
