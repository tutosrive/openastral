import type { SupabaseClient } from '@supabase/supabase-js';
import Supabase from './supabase';

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
}
