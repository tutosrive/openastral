import type { Tables } from '../models/supabase';
import Service from './service';

class AdminService extends Service {
    private table: string = 'admin';

    async get(): Promise<Tables<'admin'> | null> {
        console.log('Getting Admin');
        const { data: admin, error } = await this.supabase.from(this.table).select<'admin', Tables<'admin'>>();
        if (error !== null) {
            console.error(error);
            return null;
        }
        const data: Tables<'admin'> | null = admin !== null ? admin[0] : null;
        return data;
    }
    async getAll(): Promise<Array<Tables<'admin'>>> {
        throw new Error('Method not implemented.');
    }
    async getById(): Promise<Tables<'admin'> | null> {
        throw new Error('Method not implemented.');
    }
}

const adminService = new AdminService();
export default adminService;
