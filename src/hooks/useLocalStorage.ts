import { useCallback, useState } from 'react';

export enum STORAGE_KEYS {
  searchValue = 'searchValue',
  theme = 'theme',
}

export const readStoredValue = <T>(key: STORAGE_KEYS, initialValue: T): T => {
  const item = window.localStorage.getItem(key);
  if (!item) return initialValue;
  try {
    return JSON.parse(item) as T;
  } catch {
    return initialValue;
  }
};

export const writeStoredValue = <T>(key: STORAGE_KEYS, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = <T>(key: STORAGE_KEYS, initialValue: T) => {
  const [value, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue)
  );

  const setValue = useCallback(
    (arg: T | React.SetStateAction<T>) => {
      setStoredValue((prev) => {
        const newValue =
          typeof arg === 'function' ? (arg as (prevState: T) => T)(prev) : arg;
        writeStoredValue(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [value, setValue] as const;
};
