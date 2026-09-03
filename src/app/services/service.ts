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
    abstract getAll(): Promise<any[]>;
    abstract getById(): Promise<any>;

    async requireNewData(table: 'admin' | 'db_version' | 'language' | 'license' | 'owner' | 'repository' | 'topic' | 'topicxrepository') {
        let itRequireNewData: boolean = false;
        let data: Tables<typeof table> | null = StorageUtils.getJSONFromStorage(table);
        const dbIsOld: boolean = await this.supabase.checkDatabaseVersion();
        if (dbIsOld === true || data === null || Object.keys(data).length === 0) {
            itRequireNewData = true;
        }
        return { itRequireNewData, data };
    }
}
