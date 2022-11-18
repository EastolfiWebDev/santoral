import { Item } from '../../services/item.service';

type Props = {
    item: Item;
};
export function ItemDetail({ item }: Props) {
    return <li>{item.value} - {item.country}</li>;
}
