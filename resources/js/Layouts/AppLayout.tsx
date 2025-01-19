import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

function NavItem({
    isActive = false,
    href,
    label,
}: {
    isActive?: boolean;
    href: string;
    label: string;
}) {
    return (
        <Link
            className={
                'block rounded-md px-4 py-2 hover:bg-gray-700 ' +
                (isActive ? 'bg-gray-800' : '')
            }
            href={href}
        >
            {label}
        </Link>
    );
}

function Sidebar() {
    return (
        <div className="w-80 space-y-4 bg-gray-900 p-8">
            <div className="text-lg font-bold">Skeer</div>

            <div className="space-y-2">
                <NavItem
                    href={route('dashboard')}
                    isActive={route().current('dashboard')}
                    label="Dashboard"
                />

                <NavItem
                    href={route('accounts.index')}
                    isActive={route().current('accounts.*')}
                    label="Accounts"
                />

                <NavItem
                    href={route('transactions.index')}
                    isActive={route().current('transactions.*')}
                    label="Transactions"
                />

                <NavItem
                    href={route('profile.edit')}
                    isActive={route().current('profile.edit')}
                    label="Profile"
                />

                <Link
                    className="block w-full rounded-md px-4 py-2 text-start hover:bg-gray-700"
                    href={route('logout')}
                    method="post"
                >
                    Log Out
                </Link>
            </div>
        </div>
    );
}

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen bg-gray-800 text-gray-100">
            <Sidebar />

            <div className="grow p-8">{children}</div>
        </div>
    );
}
