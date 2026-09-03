import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class TopicService extends Service {
    private table: string = 'topic';
    private rounds: number = 0;
    private PAGE_COUNT: number = 100;
    private startCountFetch: number = 0;
    private endCountFetch: number = 0;

    async get(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getAll(isRefetch: boolean = false): Promise<any[]> {
        const { itRequireNewData, data } = await this.requireNewData('categories', 'topic');
        let savedData = data as Tables<'topic'>[];
        if (itRequireNewData === true || isRefetch === true) {
            this.startCountFetch = this.rounds * this.PAGE_COUNT;
            this.endCountFetch = this.startCountFetch + this.PAGE_COUNT - 1;
            this.rounds++;
            const { data: topic, error } = await this.client.from(this.table).select<'topic', Tables<'topic'>>().range(this.startCountFetch, this.endCountFetch).order('name', { ascending: true });
            if (error !== null) {
                console.error(error);
                return [];
            }
            savedData = savedData !== null ? [...savedData, ...topic] : topic;
            const sorted = savedData.sort((a, b) => a.name.localeCompare(b.name));
            StorageUtils.saveJSONOnLocalStorage('categories', sorted);
        }
        return savedData;
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const topicService = new TopicService();
export default topicService;
