import CategoryForm from '@/Components/Category/CategoryForm';
import { CategoryData } from '@/Data';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Edit({
    category,
    categories,
}: {
    category: CategoryData;
    categories: CategoryData[];
}) {
    return (
        <>
            <Head title="Create category" />

            <div className="max-w-xl space-y-8">
                <h2 className="text-3xl font-bold">
                    Edit Category - {category.name}
                </h2>

                <CategoryForm categories={categories} category={category} />
            </div>
        </>
    );
}
