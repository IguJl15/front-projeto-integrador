export default interface LocalStorage {
  read<T>(key: string): T | null;

  save(key: string, data: any): void;

  delete(key: string): void;
}

export class BrowserLocalStorage {
  private constructor() {}

  static instance: BrowserLocalStorage = new BrowserLocalStorage();

  read<T>(key: string): T | null {
    const storedData = window.localStorage.getItem(key);

    if (storedData) return JSON.parse(storedData) as T;

    return null;
  }

  save(key: string, data: any): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  delete(key: string): void {
    window.localStorage.removeItem(key);
  }
}
