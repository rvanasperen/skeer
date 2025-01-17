import { ButtonHTMLAttributes } from 'react';

export default function Button({
    children,
    className = '',
    theme = 'primary',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}) {
    const themeClasses = {
        primary: 'bg-blue-700 hover:bg-blue-600',
        secondary: 'bg-gray-700 hover:bg-gray-600',
        success: 'bg-green-700 hover:bg-green-600',
        warning: 'bg-yellow-700 hover:bg-yellow-600',
        danger: 'bg-red-700 hover:bg-red-600',
    }[theme];

    return (
        <button
            {...props}
            className={`rounded-md px-4 py-2 ${themeClasses} ${className}`}
        >
            {children}
        </button>
    );
}
