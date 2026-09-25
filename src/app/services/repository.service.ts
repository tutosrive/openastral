import type { Repository } from '../models/models';
import type { Tables } from '../models/supabase';
import Service from './service';

class RepositoryService extends Service {
    private PAGE_COUNT: number = 20;
    private start: number = 0;

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
    async getDataCountByTags(tags: Array<string>): Promise<number> {
        let countR = 0;
        const { data, error } = await this.client.rpc('get_count_by_topic', { topics: tags });
        if (error) {
            console.log(error);
        }
        if (data) {
            countR = data;
        }
        return countR;
    }

    async getPaginated(page: number, byTopic: boolean = false, categories: Array<string> | null = null): Promise<any[]> {
        let savedData: Tables<'repository'>[] = [];
        this.start = (page - 1) * this.PAGE_COUNT;
        const BOTH_ARGS = { startl: this.start, endl: this.PAGE_COUNT };
        const PARAMS = byTopic === true ? { fname: 'get_repositories_by_topic', args: { topics: categories, ...BOTH_ARGS } } : { fname: 'get_repositories', args: BOTH_ARGS };
        const { data, error } = await this.client.rpc(PARAMS.fname, PARAMS.args);

        if (error !== null) {
            console.debug(error);
            return [];
        }
        savedData = (data as Tables<'repository'>[]).sort((a, b) => a.name.localeCompare(b.name));
        return savedData;
    }

    async getByOwnerAndName(owner: string, repo: string): Promise<Repository | null> {
        let repository: Repository | null = null;
        const { data, error } = await this.client.rpc('get_repository', { ownername: owner, reponame: repo });
        if (error) {
            console.debug(error);
            return null;
        }
        repository = data[0] as Repository;
        return repository;
    }

    async getSearchMix(text: string, page: number): Promise<any[] | null> {
        let result: Tables<'repository'>[] | null = null;
        this.start = (page - 1) * this.PAGE_COUNT;
        const { data, error } = await this.client.rpc('find_repositories_mix', { regextofind: text, startl: this.start, total: this.PAGE_COUNT });
        if (!error) {
            result = data as Array<Tables<'repository'>>;
        }
        return result;
    }

    async getById(): Promise<any | null> {}
}

const repositoryService = new RepositoryService();
export default repositoryService;
