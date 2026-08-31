import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../models/supabase';

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
}
