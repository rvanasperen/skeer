import User from '@/Models/User';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

function Header({ user }: { user?: User }) {
    return (
        <div className="bg-indigo-800 text-gray-100 dark:bg-gray-900">
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
        <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
            <Header user={user} />

            <div className="mx-auto max-w-7xl p-4">{children}</div>
        </div>
    );
}
