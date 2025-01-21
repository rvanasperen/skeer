import { HTMLAttributes } from 'react';

export default function Card({
    children,
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`rounded-md bg-white p-6 text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100 ${className}`}
        >
            {children}
        </div>
    );
}
