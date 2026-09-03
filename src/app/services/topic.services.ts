import Service from './service';

class TopicService extends Service {
    private table: string = 'topic';

    async get(): Promise<any> {}
    getAll(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    getById(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
