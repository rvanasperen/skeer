import { PropsWithChildren } from 'react';

export default function Card({ children, ...props }: PropsWithChildren) {
    return (
        <div {...props} className="rounded-md bg-gray-900 p-6 shadow">
            {children}
        </div>
    );
}
