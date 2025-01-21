import { Card } from '@/Components/UI';
import AppLayout from '@/Layouts/AppLayout';
import { Category } from '@/Models';
import { Head } from '@inertiajs/react';

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <AppLayout>
            <Head title="Categories" />

            <div className="text-3xl font-bold">Categories</div>

            <Card>
                {categories.map((category) => (
                    <div key={category.id}>{category.name}</div>
                ))}
            </Card>
        </AppLayout>
    );
}
