import type { Tables } from '../models/supabase';
import StorageUtils from '../utils/storage.utils';
import Service from './service';

class TopicService extends Service {
    private table: string = 'topic';
    private rounds: number = 0;
    private PAGE_COUNT: number = 100;
    private startCountFetch: number = 0;
    private endCountFetch: number = 0;
    private storage: StorageUtils = StorageUtils.instance;

    async init(): Promise<TopicService> {
        this.storage = this.storage.indexedDBInstance('categories');
        return this;
    }

    async get(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getAll(isRefetch: boolean = false): Promise<any[]> {
        const itRequireNewData = await this.requireNewData('categories');
        let savedData: Tables<'topic'>[] = [];
        if (itRequireNewData === true || isRefetch === true) {
            this.startCountFetch = this.rounds * this.PAGE_COUNT;
            this.endCountFetch = this.startCountFetch + this.PAGE_COUNT - 1;
            this.rounds++;
            const { data: topic, error } = await this.client.from(this.table).select<'topic', Tables<'topic'>>().range(this.startCountFetch, this.endCountFetch).order('name', { ascending: true });
            if (error !== null) {
                console.error(error);
                return [];
            }
            topic.forEach((cat: Tables<'topic'>) => {
                this.storage.save(cat.id, cat);
            });
        }
        savedData = await this.storage.getCollection<Tables<'topic'>>();
        return savedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

const topicService = await new TopicService().init();
export default topicService;
