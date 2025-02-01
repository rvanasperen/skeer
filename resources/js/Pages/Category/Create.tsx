import CategoryForm from '@/Components/Category/CategoryForm';
import { CategoryData } from '@/Data';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Create({ categories }: { categories: CategoryData[] }) {
    return (
        <AppLayout>
            <Head title="Create category" />

            <div className="max-w-xl space-y-8">
                <h2 className="text-3xl font-bold">Create Category</h2>

                <CategoryForm categories={categories} />
            </div>
        </AppLayout>
    );
}
