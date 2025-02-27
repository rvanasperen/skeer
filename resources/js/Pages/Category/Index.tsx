import Modal from '@/Components/Modal';
import { Card } from '@/Components/UI';
import { Button } from '@/Components/UI/Form';
import IconButton from '@/Components/UI/Form/IconButton';
import { CategoryData } from '@/Data';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Head, Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import { useState } from 'react';

export default function Index({ categories }: { categories: CategoryData[] }) {
    const [showConfirmCategoryDeletion, setShowConfirmCategoryDeletion] =
        useState(false);

    const [categoryToDelete, setCategoryToDelete] = useState<CategoryData>(
        {} as CategoryData,
    );

    const { processing, delete: destroy } = useForm();

    const handleDeleteCategory = () => {
        destroy(route('categories.destroy', categoryToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowConfirmCategoryDeletion(false);
            },
        });
    };

    const renderDeleteModal = () => {
        return (
            <Modal
                show={showConfirmCategoryDeletion}
                onClose={() => {}}
                closeable={true}
                maxWidth="xl"
            >
                <form onSubmit={handleDeleteCategory} className="p-6 text-gray-100">
                    <div className="text-lg dark:text-gray-400">
                        Are you sure you want to delete the category '
                        {categoryToDelete.name}' ?
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                        This will cause {categoryToDelete.transaction_count}{' '}
                        transactions to unlinked from '{categoryToDelete.name}'
                        and will need to be categorized again.
                    </div>
                    <div className="mt-6 flex justify-end gap-4 text-white">
                        <Button
                            disabled={processing}
                            theme="danger"
                            type="submit"
                        >
                            Delete Account
                        </Button>

                        <Button
                            onClick={() =>
                                setShowConfirmCategoryDeletion(false)
                            }
                            theme="secondary"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        );
    };

    return (
        <>
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

                {showConfirmCategoryDeletion && renderDeleteModal()}

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
                                                    onClick={() => {
                                                        setShowConfirmCategoryDeletion(
                                                            true,
                                                        );

                                                        setCategoryToDelete(
                                                            category,
                                                        );
                                                    }}
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
                                                                onClick={() => {
                                                                    setShowConfirmCategoryDeletion(
                                                                        true,
                                                                    );

                                                                    setCategoryToDelete(
                                                                        childCategory,
                                                                    );
                                                                }}
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
        </>
    );
}
