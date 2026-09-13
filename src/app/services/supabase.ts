import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../models/supabase';
import fetchRetry from 'fetch-retry';

export default class Supabase {
    static #instance: Supabase;
    public client: SupabaseClient;

    private constructor() {
        const URL = import.meta.env.VITE_SUPABASE_URL;
        const APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;
        const fetchWithRetry = fetchRetry(fetch, { retries: 5, retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), retryOn: [520, 509, 429] });
        this.client = createClient<Database>(URL, APIKEY, { global: { fetch: fetchWithRetry } });
    }

    public static get instance(): Supabase {
        if (!Supabase.#instance) {
            Supabase.#instance = new Supabase();
        }

        return Supabase.#instance;
    }
}
