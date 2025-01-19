import { HTMLAttributes } from 'react';

export default function Card({
    children,
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`rounded-md bg-gray-900 p-6 shadow ${className}`}
        >
            {children}
        </div>
    );
}
