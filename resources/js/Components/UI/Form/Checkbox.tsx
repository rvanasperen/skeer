import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`rounded border-gray-700 bg-gray-900 ${className}`}
            type="checkbox"
        />
    );
}
