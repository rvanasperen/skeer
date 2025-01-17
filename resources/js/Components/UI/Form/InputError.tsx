import { HTMLAttributes } from 'react';

export default function InputError({
    className = '',
    message,
    ...props
}: HTMLAttributes<HTMLDivElement> & { message?: string }) {
    return (
        <div {...props} className={`text-sm text-red-400 ${className}`}>
            {message}
        </div>
    );
}
