import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class AdminService extends Service {
    private table: string = 'admin';

    async get(): Promise<Tables<'admin'> | null> {
        let data: Tables<'admin'> | null = StorageUtils.getJSONFromStorage('admin');
        const dbIsOld: boolean = await this.supabase.checkDatabaseVersion();
        if (dbIsOld === true || data === null || Object.keys(data).length === 0) {
            console.log('db is OLD');

            const { data: admin, error } = await this.client.from(this.table).select<'admin', Tables<'admin'>>();
            if (error !== null) {
                console.error(error);
                return null;
            }
            data = admin[0];
            StorageUtils.saveJSONOnLocalStorage('admin', data);
        }
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
