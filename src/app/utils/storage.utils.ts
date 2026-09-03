export default class StorageUtils {
    static saveJSONOnLocalStorage(key: string, data: any): boolean {
        let ok: boolean = false;
        const value: string = data == null ? '{}' : JSON.stringify(data);
        localStorage.setItem(key, value);
        const recovered: any = this.getJSONFromStorage(key);
        if (recovered == data) ok = true;
        return ok;
    }

    static getJSONFromStorage(key: string): any | null {
        let data: any | null = null;
        try {
            let value = localStorage.getItem(key);
            if (value !== null && value.length > 2) {
                data = JSON.parse(value);
            }
        } catch (e) {
            console.error(e);
        }
        return data;
    }
}
