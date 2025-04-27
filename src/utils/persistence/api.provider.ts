import { PersistenceProvider, ApiStorageOptions } from './types';

export class ApiStorageProvider implements PersistenceProvider {
  private options: ApiStorageOptions;
  private cache: Map<string, any> = new Map();
  
  constructor(options: ApiStorageOptions) {
    this.options = options;
  }
  
  getItem<T>(key: string): T | null {
    // Vérifier d'abord dans le cache pour une expérience utilisateur optimale
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    
    // Comme l'interface est synchrone mais les API sont asynchrones,
    // nous retournons null immédiatement et mettons à jour le cache en arrière-plan
    this.fetchItem<T>(key).then(data => {
      if (data) {
        this.cache.set(key, data);
      }
    }).catch(err => {
      console.error(`Error fetching item ${key} from API:`, err);
    });
    
    return null;
  }
  
  setItem<T>(key: string, value: T): void {
    // Mettre à jour le cache immédiatement
    this.cache.set(key, value);
    
    // Puis envoyer à l'API en arrière-plan
    this.saveItem(key, value).catch(err => {
      console.error(`Error saving item ${key} to API:`, err);
    });
  }
  
  removeItem(key: string): void {
    // Supprimer du cache immédiatement
    this.cache.delete(key);
    
    // Puis supprimer de l'API en arrière-plan
    this.deleteItem(key).catch(err => {
      console.error(`Error deleting item ${key} from API:`, err);
    });
  }
  
  // Méthodes asynchrones pour travailler avec l'API
  async fetchItem<T>(key: string): Promise<T | null> {
    const response = await fetch(`${this.options.baseUrl}/storage/${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as T;
  }
  
  async saveItem<T>(key: string, value: T): Promise<void> {
    const response = await fetch(`${this.options.baseUrl}/storage/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(value)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
  }
  
  async deleteItem(key: string): Promise<void> {
    const response = await fetch(`${this.options.baseUrl}/storage/${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
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

export const createApiStorageProvider = (options: ApiStorageOptions): PersistenceProvider => 
  new ApiStorageProvider(options);
