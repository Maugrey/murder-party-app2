import { StorageValue } from 'zustand/middleware';

export interface PersistenceProvider {
  getItem<T>(key: string): StorageValue<T> | null;
  setItem<T>(key: string, value: StorageValue<T>): void;
  removeItem(key: string): void;
}

export interface AsyncPersistenceProvider {
  getItem<T>(key: string): Promise<StorageValue<T> | null>;
  setItem<T>(key: string, value: StorageValue<T>): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface ApiStorageOptions {
  baseUrl: string;
  headers?: Record<string, string>;
  authToken?: string;
}
