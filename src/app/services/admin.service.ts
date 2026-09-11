import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class AdminService extends Service {
    private table: string = 'admin';
    private storage: StorageUtils = StorageUtils.instance;

    async init(): Promise<AdminService> {
        const dbVersion = await this.supabase.getDBVersion();
        this.storage = StorageUtils.instance.indexedDBInstance(this.table, dbVersion);
        return this;
    }

    async get(): Promise<Tables<'admin'> | null> {
        const { itRequireNewData, data } = await this.requireNewData('admin', 'admin');
        let savedData: Tables<'admin'> = data as Tables<'admin'>;
        if (itRequireNewData === true) {
            const { data: admin, error } = await this.client.from(this.table).select<'admin', Tables<'admin'>>();
            if (error !== null) {
                console.error(error);
                return null;
            }
            savedData = admin[0];
            this.storage.save('admin', savedData);
        }
        return savedData;
    }
    async getAll(): Promise<Array<Tables<'admin'>>> {
        throw new Error('Method not implemented.');
    }
    async getById(): Promise<Tables<'admin'> | null> {
        throw new Error('Method not implemented.');
    }
}

const adminService = await new AdminService().init();
export default adminService;
