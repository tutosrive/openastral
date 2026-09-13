import type { Tables } from '../models/supabase';
import Service from './service';

class AdminService extends Service {
    private table: string = 'admin';
    async get(): Promise<Tables<'admin'> | null> {
        let savedData: Tables<'admin'> | null = null;
        const { data: admin, error } = await this.client.from(this.table).select<'admin', Tables<'admin'>>();
        if (error !== null) {
            console.error(error);
            return null;
        }
        savedData = admin[0];
        return savedData;
    }
    async getPaginated(): Promise<Array<Tables<'admin'>>> {
        throw new Error('Method not implemented.');
    }
    async getById(): Promise<Tables<'admin'> | null> {
        throw new Error('Method not implemented.');
    }
}

const adminService = new AdminService();
export default adminService;
