import User from '@/Models/User';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

function TopNav({ user }: { user?: User }) {
    return (
        <div className="dark:bg-gray-950">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <Link href={route('index')} className="text-lg font-bold">
                    Skeer
                </Link>

                <div className="flex gap-4">
                    {user ? (
                        <Link href={route('dashboard')}>Dashboard</Link>
                    ) : (
                        <>
                            <Link href={route('login')}>Login</Link>
                            <Link href={route('register')}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GuestLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-800 dark:text-gray-100">
            <TopNav user={user} />

            <div className="mx-auto max-w-7xl p-4">{children}</div>
        </div>
    );
}
