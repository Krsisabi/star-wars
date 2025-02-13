import { useCallback, useState } from 'react';

export enum STORAGE_KEYS {
  searchValue = 'searchValue',
  theme = 'theme',
}

export const useLocalStorage = <T>(key: STORAGE_KEYS, initialValue: T) => {
  const [value, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (arg: T | React.SetStateAction<T>) => {
      setStoredValue((prev) => {
        const newValue =
          typeof arg === 'function' ? (arg as (prevState: T) => T)(prev) : arg;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    },
    [key]
  );

  return [value, setValue] as const;
};
