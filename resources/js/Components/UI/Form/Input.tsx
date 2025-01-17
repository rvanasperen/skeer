import { forwardRef, InputHTMLAttributes } from 'react';

export default forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(function Input({ className = '', ...props }, ref) {
    return (
        <input
            {...props}
            className={`rounded-md border-gray-700 bg-gray-900 ${className}`}
            ref={ref}
        />
    );
});
