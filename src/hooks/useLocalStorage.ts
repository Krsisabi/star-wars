import { useCallback, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
  const [value, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (arg: T | React.SetStateAction<T>) => {
      if (typeof arg === 'function') {
        setStoredValue((prev) => {
          const newValue = (arg as (prevState: T) => T)(prev);
          window.localStorage.setItem(key, JSON.stringify(newValue));
          return newValue;
        });
      } else {
        window.localStorage.setItem(key, JSON.stringify(arg));
        setStoredValue(arg);
      }
    },
    [key]
  );

  return { value, setValue } as const;
};
