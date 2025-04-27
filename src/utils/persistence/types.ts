export interface PersistenceProvider {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
}

export interface ApiStorageOptions {
  baseUrl: string;
  headers?: Record<string, string>;
  authToken?: string;
}
