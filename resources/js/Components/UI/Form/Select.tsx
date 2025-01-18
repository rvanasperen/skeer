import { forwardRef, PropsWithChildren, SelectHTMLAttributes } from "react";

export default forwardRef<
    HTMLSelectElement,
    PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>
>(function Select({ children, className = '', ...props }, ref) {
    return (
        <select
            {...props}
            className={`rounded-md border-gray-700 bg-gray-900 ${className}`}
            ref={ref}
        >
            {children}
        </select>
    );
});
