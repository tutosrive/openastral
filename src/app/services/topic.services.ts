import type { Tables } from '../models/supabase';
import Service from './service';

class TopicService extends Service {
    private table: string = 'topic';
    private PAGE_COUNT: number = 80;
    private start: number = 0;
    private end: number = 0;

    async get(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getDataCount(): Promise<number> {
        let countR = 0;
        const saved = localStorage.getItem('tc');
        if (!saved || saved.length === 0) {
            const { count, error } = await this.client.from(this.table).select('*', { count: 'exact', head: true });
            if (error) {
                console.log(error);
            }
            if (count) {
                countR = count;
                localStorage.setItem('tc', count.toString());
            }
        }
        countR = parseInt(localStorage.getItem('rc')!!);
        return countR;
    }

    async getPaginated(page: number): Promise<any[]> {
        let savedData: Tables<'topic'>[] = [];
        this.start = (page - 1) * this.PAGE_COUNT;
        this.end = this.start + this.PAGE_COUNT;
        console.log(this.start);

        const { data, error } = await this.client.from('topic').select().range(this.start, this.end);

        if (error !== null) {
            console.debug(error);
            return [];
        }
        savedData = (data as Tables<'topic'>[]).sort((a, b) => a.name.localeCompare(b.name));
        return savedData;
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const topicService = new TopicService();
export default topicService;
