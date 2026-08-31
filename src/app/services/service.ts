import type { SupabaseClient } from '@supabase/supabase-js';
import Supabase from './supabase';

export default abstract class Service {
    protected supabase: SupabaseClient;

    public constructor() {
        this.supabase = Supabase.instance.client;
    }

    abstract get(): Promise<any>;
    abstract getAll(): Promise<any[]>;
    abstract getById(): Promise<any>;
}
