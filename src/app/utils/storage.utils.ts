import localforage from 'localforage';

export default class StorageUtils {
    static #instance: StorageUtils;
    storage: LocalForage | undefined;

    private constructor() {}

    static get instance(): StorageUtils {
        if (!this.#instance) {
            this.#instance = new StorageUtils();
        }
        return this.#instance;
    }

    indexedDBInstance(storeName: string): StorageUtils {
        const STORAGE_CONFIG: LocalForageOptions = { name: `openastral`, storeName, driver: localforage.INDEXEDDB };
        this.storage = localforage.createInstance(STORAGE_CONFIG);
        return this;
    }

    async save(key: string, data: any): Promise<boolean> {
        let ok: boolean = false;
        await this.storage?.setItem<any>(key, data, (err, value) => {
            if (!err || value === data) {
                ok = true;
            }
        });
        return ok;
    }

    async get(key: string): Promise<any | null> {
        let data: any | null = null;
        await this.storage?.getItem(key, (err, value) => {
            if (!err && value) {
                data = value;
            }
        });
        return data;
    }

    async getAnyByKey<T>(key: string): Promise<T | null> {
        let data: any | null = null;
        await this.storage?.getItem<T>(key, (e, v) => {
            if (!e && v) {
                data = v;
            }
        });
        return data;
    }

    async saveAnyByKey<T>(key: string, data: T): Promise<T | null> {
        let dataSaved: T | null = null;
        await this.storage?.setItem<T>(key, data, (e, v) => {
            if (!e && v) {
                dataSaved = v;
            }
        });
        return dataSaved;
    }

    async getCollectionKeys(): Promise<string[] | null> {
        let data: Array<string> | null = null;
        await this.storage?.keys((e, keys) => {
            if (!e && keys) {
                data = keys;
            }
        });
        return data;
    }

    async getCollection<T>(): Promise<T[]> {
        let data: Array<T> = [];
        await this.storage?.iterate((value) => {
            if (value) {
                data.push(value as T);
            }
        });
        return data;
    }
}
