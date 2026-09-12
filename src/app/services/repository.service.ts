import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class RepositoryService extends Service {
    private PAGE_COUNT: number = 50;
    private rounds: number = 0;
    private start: number = 0;

    private storage: StorageUtils = StorageUtils.instance;

    async init(): Promise<RepositoryService> {
        this.storage = StorageUtils.instance.indexedDBInstance('repositories');
        return this;
    }

    get(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async getAll(isRefetch: boolean): Promise<any[]> {
        const itRequireNewData = await this.requireNewData('repositories');
        let savedData: Tables<'repository'>[] = []; //await this.storage.getCollection<Tables<'repository'>>();
        if (itRequireNewData === true || isRefetch === true) {
            this.start = this.rounds * this.PAGE_COUNT;
            const { data, error } = await this.client.rpc('get_repositories', { startl: this.start, endl: this.PAGE_COUNT });
            console.log(data);

            if (error !== null) {
                console.error(error);
                return [];
            }
            data.forEach(async (repo: Tables<'repository'>) => {
                await this.storage.save(repo.id, repo);
            });
            this.rounds++;
        }
        savedData = await this.storage.getCollection<Tables<'repository'>>();
        return savedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const repositoryService = await new RepositoryService().init();
export default repositoryService;
