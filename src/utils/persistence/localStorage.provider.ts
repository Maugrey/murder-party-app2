import { PersistenceProvider } from './types';

export class LocalStorageProvider implements PersistenceProvider {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export const localStorageProvider = new LocalStorageProvider();
