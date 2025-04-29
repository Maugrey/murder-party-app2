import { PersistenceProvider } from './types';
import { StorageValue } from 'zustand/middleware';

export class LocalStorageProvider implements PersistenceProvider {
  getItem<T>(key: string): StorageValue<T> | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as StorageValue<T>) : null;
  }

  setItem<T>(key: string, value: StorageValue<T>) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const localStorageProvider = new LocalStorageProvider();
