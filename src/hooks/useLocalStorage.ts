import { useState, useEffect } from 'react';
import { Storage } from '../base/utils/Storage';

export function useLocalStorage<T>(localStorageKey: string, defaultValue?: T) {
  const initialLocalValue = Storage.get(localStorageKey, defaultValue);
  const [value, setValue] = useState<T | undefined>(initialLocalValue);

  useEffect(() => {
    if (value === null || value === undefined) {
      Storage.remove(localStorageKey);
    } else {
      Storage.set(localStorageKey, value);
    }
  }, [value, localStorageKey]);

  return [value, setValue] as const;
}
