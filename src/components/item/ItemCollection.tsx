import { For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Item, useService } from '../../services/item.service';
import { AddItem } from './AddItem';
import { ItemDetail } from './Item';

export function ItemCollection() {
    const [ items, setItems ] = createStore<Item[]>([]);
    const itemService = useService('');

    itemService.find().then((i: Item[]) => setItems(i))

    return (
        <ul>
            <li><AddItem /></li>

            <For each={items}>
                {(item: Item, index) => <ItemDetail item={item} />}
            </For>
        </ul>
    );
}
