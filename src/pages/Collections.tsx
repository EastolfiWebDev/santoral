import { ItemCollection } from '../components/item/ItemCollection';
import { useService } from '../services/item.service';

export function CollectionsPage() {
    const itemService = useService('');

    return (
        <>
            <ItemCollection />
        </>
    );
}
