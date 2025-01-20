import { PaginatedData } from '@/types';
import { Link } from '@inertiajs/react';

export default function PaginationControls({
    pagination,
}: {
    pagination: PaginatedData<unknown>;
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                Showing {pagination.from} to {pagination.to} of{' '}
                {pagination.total} items
            </div>

            <div>
                {pagination.links.map((link) => (
                    <Link
                        key={link.url}
                        className={`rounded-md px-4 py-2 ${
                            link.active
                                ? 'bg-gray-800 text-gray-100'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
                        }`}
                        href={link.url || '#'}
                    >
                        <span
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
