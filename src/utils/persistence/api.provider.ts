import { AsyncPersistenceProvider, ApiStorageOptions } from './types';
import { StorageValue } from 'zustand/middleware';

export class ApiStorageProvider implements AsyncPersistenceProvider {
  private options: ApiStorageOptions;

  constructor(options: ApiStorageOptions) {
    this.options = options;
  }

  async getItem<T>(key: string): Promise<StorageValue<T> | null> {
    try {
      const response = await fetch(`${this.options.baseUrl}/persistence/${encodeURIComponent(key)}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      // L'API renvoie maintenant directement les données au format StorageValue
      return result as StorageValue<T>;
    } catch (err) {
      console.error(`Error fetching item ${key} from API:`, err);
      return null;
    }
  }

  async setItem<T>(key: string, value: StorageValue<T>): Promise<void> {
    try {
      const response = await fetch(`${this.options.baseUrl}/persistence/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(value) // Envoi direct de value sans l'envelopper
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Error saving item ${key} to API:`, err);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      const response = await fetch(`${this.options.baseUrl}/persistence/${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Error deleting item ${key} from API:`, err);
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.options.headers
    };

    if (this.options.authToken) {
      headers['Authorization'] = `Bearer ${this.options.authToken}`;
    }

    return headers;
  }
}

export const createApiStorageProvider = (options: ApiStorageOptions): AsyncPersistenceProvider => 
  new ApiStorageProvider(options);
