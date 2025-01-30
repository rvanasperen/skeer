import { Card } from '@/Components/UI';
import { Button } from '@/Components/UI/Form';
import IconButton from '@/Components/UI/Form/IconButton';
import { CategoryData } from '@/Data';
import AppLayout from '@/Layouts/AppLayout';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Head, Link } from '@inertiajs/react';
import classNames from 'classnames';

export default function Index({ categories }: { categories: CategoryData[] }) {
    return (
        <AppLayout>
            <Head title="Categories" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Categories</div>

                    <Link
                        className="inline-block"
                        href={route('categories.create')}
                    >
                        <Button>Create category</Button>
                    </Link>
                </div>

                <Card>
                    <table className="w-full table-auto">
                        {categories.map((category) => {
                            const parentRowClasses = classNames(
                                'border-b-gray-400',
                                {
                                    'border-b-2':
                                        category?.children?.length > 0,
                                },
                            );

                            return (
                                <>
                                    <tr className={parentRowClasses}>
                                        <td
                                            key={category.id}
                                            className="h-16 font-extrabold"
                                        >
                                            {category.name}
                                        </td>
                                        <td className="w-24">
                                            <Link
                                                className="inline-block"
                                                href={route(
                                                    'categories.edit',
                                                    category.id,
                                                )}
                                            >
                                                <IconButton
                                                    iconName={faPenToSquare}
                                                    theme="secondary"
                                                >
                                                    Edit
                                                </IconButton>
                                            </Link>
                                        </td>
                                        <td className="w-32">
                                            {category.children?.length ===
                                                0 && (
                                                <IconButton
                                                    iconName={faTrash}
                                                    theme="danger"
                                                >
                                                    Delete
                                                </IconButton>
                                            )}
                                        </td>
                                    </tr>
                                    {category.children &&
                                        category.children.map(
                                            (childCategory) => {
                                                return (
                                                    <tr key={childCategory.id}>
                                                        <td
                                                            key={
                                                                childCategory.id
                                                            }
                                                            className="h-16 pl-4"
                                                        >
                                                            {childCategory.name}
                                                        </td>
                                                        <td className="w-24">
                                                            <Link
                                                                className="inline-block"
                                                                href={route(
                                                                    'categories.edit',
                                                                    childCategory.id,
                                                                )}
                                                            >
                                                                <IconButton
                                                                    theme="secondary"
                                                                    iconName={
                                                                        faPenToSquare
                                                                    }
                                                                    className="h-10"
                                                                >
                                                                    Edit
                                                                </IconButton>
                                                            </Link>
                                                        </td>
                                                        <td className="w-32">
                                                            <IconButton
                                                                theme="danger"
                                                                iconName={
                                                                    faTrash
                                                                }
                                                                className="h-10"
                                                            >
                                                                Delete
                                                            </IconButton>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                </>
                            );
                        })}
                    </table>
                </Card>
            </div>
        </AppLayout>
    );
}
