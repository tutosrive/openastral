import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class RepositoryService extends Service {
    private PAGE_COUNT: number = 50;
    private rounds: number = 0;
    private start: number = 0;
    private end: number = 0;
    private table: string = 'repository';

    get(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async getAll(isRefetch: boolean): Promise<any[]> {
        const { itRequireNewData, data } = await this.requireNewData('repositories', 'repository');
        let savedData = data as Tables<'repository'>[];
        if (itRequireNewData === true || isRefetch === true) {
            this.start = this.rounds * this.PAGE_COUNT;
            // this.end = this.start + this.PAGE_COUNT - 1;
            const { data, error } = await this.client.rpc('get_repositories', { startl: this.start, endl: this.PAGE_COUNT });
            if (error !== null) {
                console.error(error);
                return [];
            }
            console.log(data);

            savedData = savedData !== null ? [...savedData, ...data] : data;
            const sorted = savedData.sort((a, b) => a.name.localeCompare(b.name));
            StorageUtils.saveJSONOnLocalStorage('repositories', sorted);
            this.rounds++;
        }
        return savedData;
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const repositoryService = new RepositoryService();
export default repositoryService;
