import { A } from '@solidjs/router';
import { Item } from '../../services/item.service';

type Props = {
};
export function AddItem({  }: Props) {
    return <A href='/item/add'>Add Item</A>;
}
