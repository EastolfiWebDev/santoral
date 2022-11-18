export class LocalStorageService {
    public static get<T>(key: string, def = {}): T {
        return JSON.parse(localStorage.getItem(key) || 'null') || def as T;
    }

    public static put<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
