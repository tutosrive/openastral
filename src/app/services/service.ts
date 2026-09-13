import type { SupabaseClient } from '@supabase/supabase-js';
import Supabase from './supabase';
import StorageUtils from '../utils/storage.utils';

export default abstract class Service {
    protected supabase: Supabase;
    protected client: SupabaseClient;

    public constructor() {
        this.supabase = Supabase.instance;
        this.client = Supabase.instance.client;
    }

    abstract get(): Promise<any>;
    abstract getAll(page: number, isRefetch: boolean): Promise<any[]>;
    abstract getById(): Promise<any>;

    protected async requireNewData(key: string) {
        let itRequireNewData: boolean = false;
        const isOld = await this.supabase.checkDatabaseVersion();
        let keys: Array<string> | null = await StorageUtils.instance.indexedDBInstance(key).getCollectionKeys(); //await StorageUtils.getJSONFromStorage(key);

        if (isOld === true || keys === null || keys.length === 0) {
            itRequireNewData = true;
        }
        return itRequireNewData;
    }
}
