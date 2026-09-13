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

    async getPaginated(page: number): Promise<any[]> {
        let savedData: Tables<'repository'>[] = [];
        this.start = (page - 1) * this.PAGE_COUNT;
        const { data, error } = await this.client.rpc('get_repositories', { startl: this.start, endl: this.PAGE_COUNT });

        if (error !== null) {
            console.debug(error);
            return [];
        }
        savedData = (data as Tables<'repository'>[]).sort((a, b) => a.name.localeCompare(b.name));
        return savedData;
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const repositoryService = new RepositoryService();
export default repositoryService;
