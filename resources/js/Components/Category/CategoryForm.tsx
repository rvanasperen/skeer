import { useNotificationsContext } from '@/Components/Providers/NotificationsProvider';
import { Button, Input, Label, Select } from '@/Components/UI/Form';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, FormHTMLAttributes } from 'react';
import CategoryData from '../../Data/CategoryData';

export default function CategoryForm({
    categories,
    category,
    className = '',
    ...props
}: FormHTMLAttributes<HTMLFormElement> & {
    categories: CategoryData[];
    category?: CategoryData;
}) {
    const { showNotification } = useNotificationsContext();

    // data, errors,
    const { data, post, put, processing, setData } = useForm<{
        name: string;
        parent_id: number | null;
    }>({
        name: category?.name || '',
        parent_id: category?.parent_id || null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (category) {
            put(route('categories.update', category.id), {
                onSuccess: () =>
                    showNotification({
                        message: 'Account updated!',
                        type: 'success',
                    }),
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () =>
                    showNotification({
                        message: 'Account created!',
                        type: 'success',
                    }),
            });
        }
    };

    return (
        <form
            {...props}
            className={`space-y-4 ${className}`}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col space-y-4">
                <div className="inline-flex flex-col space-y-2">
                    <Label htmlFor="name" value="Name" />
                    <Input
                        required={true}
                        value={data.name}
                        name="name"
                        id="name"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>

                <div className="inline-flex flex-col space-y-2">
                    <Label htmlFor="parent_id" value="Parent Category" />
                    <Select
                        value={data.parent_id || ''}
                        name="parent_id"
                        id="parent_id"
                        onChange={(e) =>
                            setData('parent_id', parseInt(e.target.value))
                        }
                    >
                        <option value="">No parent</option>
                        {categories.map((category) => (
                            <option
                                value={category.id}
                                key={`category_${category.id}`}
                            >
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <Button type="submit" disabled={processing}>
                {category ? 'Update Category' : 'Create Category'}
            </Button>
        </form>
    );
}
