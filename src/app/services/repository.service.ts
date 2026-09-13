import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class RepositoryService extends Service {
    private PAGE_COUNT: number = 60;
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

    async getDataCount(): Promise<number> {
        let countR = 0;
        const saved = localStorage.getItem('rc');
        if (!saved || saved.length === 0) {
            const { count, error } = await this.client.from('repository').select('*', { count: 'exact', head: true });
            if (error) {
                console.log(error);
            }
            if (count) {
                countR = count;
                localStorage.setItem('rc', count.toString());
            }
        }
        countR = parseInt(localStorage.getItem('rc')!!);
        return countR;
    }

    async getAll(page: number, isRefetch: boolean): Promise<any[]> {
        const itRequireNewData: boolean = await this.requireNewData('repositories');
        // const missingData:boolean = (await this.storage.getCollectionKeys())?.length ?? false
        let savedData: Tables<'repository'>[] = [];
        if (itRequireNewData === true || isRefetch === true) {
            this.start = page * this.PAGE_COUNT;
            const { data, error } = await this.client.rpc('get_repositories', { startl: this.start, endl: this.PAGE_COUNT });

            if (error !== null) {
                console.error(error);
                return [];
            }
            console.log('New data here:');
            console.log(data);

            data.forEach(async (repo: Tables<'repository'>) => {
                await this.storage.save(repo.id, repo);
            });
            // this.rounds++;
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
