import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database, Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';

export default class Supabase {
    static #instance: Supabase;
    public client: SupabaseClient;

    private constructor() {
        const URL = import.meta.env.VITE_SUPABASE_URL;
        const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;
        this.client = createClient<Database>(URL, APIKEY);
    }

    public static get instance(): Supabase {
        if (!Supabase.#instance) {
            Supabase.#instance = new Supabase();
        }

        return Supabase.#instance;
    }

    public async getDBVersion(): Promise<number> {
        let version: number = -1;
        const { data: db_version, error } = await Supabase.#instance.client.from('db_version').select<'db_version', Tables<'db_version'>>();

        if (error !== null) {
            console.error(error);
        } else {
            version = db_version[0]?.version;
        }
        return version;
    }

    public async checkDatabaseVersion(): Promise<{ isOld: boolean; dbVersion: number }> {
        let isOld = false;
        const TEMP_STORAGE = StorageUtils.instance.localStorageInstance();
        const dbVersion = await this.getDBVersion();
        const dbVersionSaved: number | null = await TEMP_STORAGE.getAnyByKey<number>('db_version');
        console.log(`Saved: ${dbVersionSaved} | New: ${dbVersion}`);

        if (dbVersionSaved === -1) {
            isOld = true;
        } else {
            isOld = dbVersionSaved != dbVersion;
        }
        TEMP_STORAGE.saveAnyByKey<number>('db_version', dbVersion);
        // localStorage.setItem('db_version', `${version}`);

        return { isOld, dbVersion };
    }
}
