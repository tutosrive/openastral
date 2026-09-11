import type { SupabaseClient } from '@supabase/supabase-js';
import Supabase from './supabase';
import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';

export default abstract class Service {
    protected supabase: Supabase;
    protected client: SupabaseClient;

    public constructor() {
        this.supabase = Supabase.instance;
        this.client = Supabase.instance.client;
    }

    abstract get(): Promise<any>;
    abstract getAll(isRefetch: boolean): Promise<any[]>;
    abstract getById(): Promise<any>;

    protected async requireNewData(key: string, table: 'admin' | 'db_version' | 'language' | 'license' | 'owner' | 'repository' | 'topic' | 'topicxrepository') {
        let itRequireNewData: boolean = false;
        const { isOld, dbVersion } = await this.supabase.checkDatabaseVersion();
        let data: Tables<typeof table> | null | Tables<typeof table>[] = await StorageUtils.instance.indexedDBInstance(key, dbVersion).get(key); //await StorageUtils.getJSONFromStorage(key);
        if (isOld === true || data === null || Object.keys(data).length === 0) {
            itRequireNewData = true;
        }
        return { itRequireNewData, data };
    }
}
