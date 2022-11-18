import { LocalStorageService } from "./localStorage.service";

export interface Item {
    value: number;
    country: string;
    image?: string;
}
export type ItemForm = {
    value?: number;
    country?: string;
};

export class ItemService {
    items: Item[] = [
        { value: 1, country: 'FR' }
    ];

    constructor() {
        //
    }

    public find(): Promise<Item[]> {
        return Promise.resolve(LocalStorageService.get('items_temp', []));
    }

    public add(item: Item): Promise<void> {
        const items = LocalStorageService.get<Item[]>('items_temp', []);
        items.push(item);
        LocalStorageService.put('items_temp', items)

        return Promise.resolve();
    }

    public prepareFormForSubmit({ value, country }: ItemForm): Item {
        return { value, country } as Item
    }
}

let serviceIntances: ItemService;
export function useService(clazz: string) {
    if (!serviceIntances) {
        serviceIntances = new ItemService();
    }

    return serviceIntances;
}
