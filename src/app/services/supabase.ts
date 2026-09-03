import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database, Tables } from '../models/supabase';

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

    public async checkDatabaseVersion(): Promise<boolean> {
        let isOld = false;
        const { data: db_version, error } = await Supabase.#instance.client.from('db_version').select<'db_version', Tables<'db_version'>>();

        if (error !== null) {
            console.error(error);
        } else {
            const version: string | null = db_version[0]?.version;
            const dbVersionSaved: string | null = localStorage.getItem('db_version');
            console.log(`Saved: ${dbVersionSaved} | New: ${db_version[0].version}`);

            if (dbVersionSaved === null || dbVersionSaved.length == 0) {
                isOld = true;
            } else {
                isOld = dbVersionSaved != version;
            }
            localStorage.setItem('db_version', `${version}`);
        }

        return isOld;
    }
}
