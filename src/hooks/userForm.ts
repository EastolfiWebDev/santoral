import { createStore, StoreSetter } from 'solid-js/store';
import { CustomPartial } from 'solid-js/store/types/store';

type FormFields = {
    value?: number;
    country?: string;
    image?: string;
    // [key: string]: any
};

const submit = <T> (data: T): Promise<T> => {
    // here we can:
    // filter out unneeded data, e.g. the checkbox sameAsAddress
    // map fields, if needed, e.g. shipping_address
    // const dataToSubmit = {
    //     value: form.value,
    //     country: form.country,
    // };

    // should be submitting your form to some backend service
    // console.log(`submitting ${JSON.stringify(dataToSubmit)}`);

    return Promise.resolve(data as T);
};

type Mix<A, B> = {
    [K in keyof B | keyof A]: K extends keyof A
      ? A[K]
      : K extends keyof B
      ? B[K]
      : never
}
type Versionable = { version: number }

function t<T>(): void {
    const version1: Partial<Mix<Versionable, T>>['version'] = 1 // compiles - version type is correctly inferred as number | undefined
    const version2: Partial<Mix<Versionable, T>>['version'] = undefined // compiles
    // const version3: Partial<Mix<Versionable, T>>['version'] = '1' // does not compile as expected

    const obj1: Partial<Mix<Versionable, T>> = { version: 1 } // DOES NOT COMPILE.... WHY??
    const obj2: Partial<Mix<Versionable, T>> = { version: undefined } // compiles
    // const obj3: Partial<Mix<Versionable, T>> = { version: '1' } // does not compile as expected
    const obj4: Partial<Mix<Versionable, T>> = {} // compiles
    obj4.version = 1 // compiles
}

// type Return = T | CustomPartial<T>) | T | CustomPartial<T>
// declare type StoreSetter<T, U extends PropertyKey[] = []> = ((prevState: T, traversed: U) => Return;
const useForm = <T extends FormFields>(i: T) => {
    const [form, setForm] = createStore<T>(i);

    // const updateFormFieldFromEvent = (fieldName: string) => (event: Event) => {
    //     const inputElement = event.currentTarget as HTMLInputElement;
    //     setForm({
    //         [fieldName]: inputElement.value,
    //     });
    // };

    const updateFormField = (fieldName: string, value: Partial<T>) => {
        // setForm({
        //     toString: undefined
        //     // [fieldName]: value,
        // });
        const a1: Partial<T> = { [fieldName]: '' }
        const asd: PropertyKey = fieldName;
        const dsa: CustomPartial<T> = ''
        const aaa: StoreSetter<T, PropertyKey[]> = { [fieldName]: '' };
        setForm(aaa);
    };

    const clearField = (fieldName: string) => {
        setForm({
            [fieldName]: undefined,
        });
    };

    return { form, submit, updateFormField, updateFormFieldFromEvent, clearField };
};

export { useForm };
