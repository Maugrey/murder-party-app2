import { PersistenceProvider } from './types';
import { StorageValue } from 'zustand/middleware';

export class CookieStorageProvider implements PersistenceProvider {
  private defaultExpiryDays = 30;

  getItem<T>(key: string): StorageValue<T> | null {
    const cookieValue = this.getCookie(key);
    return cookieValue ? (JSON.parse(cookieValue) as StorageValue<T>) : null;
  }

  setItem<T>(key: string, value: StorageValue<T>, expiryDays = this.defaultExpiryDays): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    const cookieValue = JSON.stringify(value);
    document.cookie = `${key}=${encodeURIComponent(cookieValue)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  }

  removeItem(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  }

  private getCookie(key: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
}

export const cookieStorageProvider = new CookieStorageProvider();
