import { useNavigate } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { Camera } from "../components/camera";
import { useForm } from "../hooks/userForm";
import { Item, ItemForm, useService } from "../services/item.service";

export function ItemPage() {
    // console.log(location);

    const [ showCamera, setShowCamera ] = createSignal<boolean>(false);
    const navigate = useNavigate();
    const { form, updateFormField, updateFormFieldFromEvent, submit } = useForm<ItemForm>();
    const itemService = useService('');

    // submitFormTo((data: Item) => itemService.add(data))
    // .then(() => navigate('/collections'));

    const handleSubmit = (event: Event): void => {
        event.preventDefault();
        submit<Item>(itemService.prepareFormForSubmit(form)).then((data: Item) => {
            itemService.add(data).then(() => navigate('/collections'));
        } );
    };

    const handlePictureTaken = (picture: string) => {
        updateFormField('image', picture);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div class="grid">
                <label for="value">
                    Value
                    <input
                        required
                        id="value"
                        type="number"
                        name="value"
                        placeholder="Value"
                        value={form.value}
                        onChange={updateFormFieldFromEvent('value')}
                    />
                </label>

                <label for="country">
                    Country
                    <input
                        required
                        id="country"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={form.country}
                        onChange={updateFormFieldFromEvent('country')}
                    />
                </label>

            </div>
            <div class="grid">
                <Show
                    when={showCamera()}
                    fallback={
                        <button onClick={() => setShowCamera(true)}>Add Picture</button>
                    }
                >
                    <Camera onPictureTaken={handlePictureTaken} />
                </Show>
            </div>

            {/* <small>We'll never share your email with anyone else.</small> */}

            <button type="submit">Submit</button>
        </form>
    );
}
