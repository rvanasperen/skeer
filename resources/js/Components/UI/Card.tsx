import { PropsWithChildren } from 'react';

export default function Card({ children, ...props }: PropsWithChildren) {
    return (
        <div {...props} className="rounded bg-gray-900 p-4 shadow">
            {children}
        </div>
    );
}
