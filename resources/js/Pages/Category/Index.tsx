import { Card } from '@/Components/UI';
import { CategoryData } from '@/Data';
import { Head } from '@inertiajs/react';

export default function Index({ categories }: { categories: CategoryData[] }) {
    return (
        <>
            <Head title="Categories" />

            <div className="space-y-4 xl:space-y-8">
                <div className="text-3xl font-bold">Categories</div>

                <Card>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <div key={category.id}>{category.name}</div>
                            {category.children && (
                                <div className="pl-4">
                                    {category.children.map((childCategory) => (
                                        <div key={childCategory.id}>
                                            {childCategory.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </Card>
            </div>
        </>
    );
}
