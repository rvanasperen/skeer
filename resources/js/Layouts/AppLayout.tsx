import { ApplicationLogo } from '@/Components/UI/Icons';
import { Link, usePage } from '@inertiajs/react';
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

function Sidebar({ showSetup }: { showSetup: boolean }) {
    return (
        <div className="w-80 flex-none space-y-8 bg-gray-900 p-8">
            <div className="flex items-end gap-2">
                <ApplicationLogo className="h-14 fill-current text-gray-100" />
                <div>
                    <div className="text-4xl font-bold">Skeer</div>
                    <div className="text-sm text-gray-400">
                        (Dutch slang for broke, adj.)
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {showSetup && (
                    <NavItem
                        href={route('setup')}
                        isActive={route().current('setup')}
                        label="Setup"
                    />
                )}

                {!showSetup && (
                    <>
                        <NavItem
                            href={route('dashboard')}
                            isActive={route().current('dashboard')}
                            label="Dashboard"
                        />

                        <NavItem
                            href={route('reports')}
                            isActive={route().current('reports')}
                            label="Reports"
                        />

                        <div>
                            <hr className="my-4 border-gray-700" />
                        </div>

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
                    </>
                )}

                <div>
                    <hr className="my-4 border-gray-700" />
                </div>

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
    const user = usePage().props.auth.user;

    console.log(user);

    return (
        <div className="flex min-h-screen bg-gray-800 text-gray-100">
            <Sidebar showSetup={user.accounts?.length === 0} />

            <div className="grow p-8">{children}</div>
        </div>
    );
}
