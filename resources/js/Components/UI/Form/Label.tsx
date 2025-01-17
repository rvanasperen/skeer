import { LabelHTMLAttributes } from 'react';

export default function Label({
    children,
    className = '',
    value,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label {...props} className={`block text-sm ${className}`}>
            {value ? value : children}
        </label>
    );
}
