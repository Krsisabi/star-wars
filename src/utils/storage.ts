export const STORAGE_KEYS = {
  searchValue: 'searchValue',
  theme: 'theme',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// Values are kept as JSON. What comes back is unknown: it may have been
// written by an older version, or by hand, and the reader checks it.
export const readStored = (key: StorageKey): unknown => {
  const item = window.localStorage.getItem(key);
  if (item === null) return undefined;
  try {
    return JSON.parse(item);
  } catch {
    return undefined;
  }
};

export const writeStored = (key: StorageKey, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
