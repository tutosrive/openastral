import localforage from 'localforage';

export default class StorageUtils {
    // static saveJSONOnLocalStorage(key: string, data: any): boolean {
    //     let ok: boolean = false;
    //     const value: string = data == null ? '{}' : JSON.stringify(data);
    //     localStorage.setItem(key, value);
    //     const recovered: any = this.getJSONFromStorage(key);
    //     if (recovered == data) ok = true;
    //     return ok;
    // }
    static #instance: StorageUtils;
    localforage: LocalForage | undefined;

    private constructor() {}

    static get instance(): StorageUtils {
        if (!this.#instance) {
            this.#instance = new StorageUtils();
        }
        return this.#instance;
    }

    indexedDBInstance(storeName: string, version: number): StorageUtils {
        const STORAGE_CONFIG: LocalForageOptions = { name: `openastral-${storeName}`, storeName, version, driver: localforage.INDEXEDDB };
        this.localforage = localforage.createInstance(STORAGE_CONFIG);
        console.log(this.localforage);
        return this;
    }

    localStorageInstance(): StorageUtils {
        const STORAGE_CONFIG: LocalForageOptions = { name: `openastral-localstorage`, driver: localforage.LOCALSTORAGE };
        this.localforage = localforage.createInstance(STORAGE_CONFIG);
        console.log(this.localforage);
        return this;
    }

    async save(key: string, data: any): Promise<boolean> {
        let ok: boolean = false;
        await this.localforage?.setItem<any>(key, data, (err, value) => {
            console.log('ERROR', err);
            console.log('DATA', data);

            if (!err || value === data) {
                ok = true;
            }
        });
        return ok;
    }

    async get(key: string): Promise<any | null> {
        let data: any | null = null;
        await this.localforage?.getItem(key, (err, value) => {
            console.log('ERROR', err);
            console.log('DATA', data);
            if (!err && value) {
                data = value;
            }
        });
        return data;
    }

    async getAnyByKey<T>(key: string): Promise<T | null> {
        let data: any | null = null;
        await this.localforage?.getItem<T>(key, (e, v) => {
            console.log('ERROR', e);
            console.log('DATA', data);
            if (!e && v) {
                data = v;
            }
        });
        return data;
    }

    async saveAnyByKey<T>(key: string, data: T): Promise<T | null> {
        let dataSaved: T | null = null;
        await this.localforage?.setItem<T>(key, data, (e, v) => {
            if (!e && v) {
                dataSaved = v;
            }
        });
        return dataSaved;
    }

    // static getJSONFromStorage(key: string): any | null {
    //     let data: any | null = null;
    //     try {
    //         let value = localStorage.getItem(key);
    //         if (value !== null && value.length > 2) {
    //             data = JSON.parse(value);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     return data;
    // }
}
