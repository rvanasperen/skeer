import {
    KeyboardShortcut,
    useKeyboardShortcutsContext,
} from '@/Components/Providers/KeyboardShortcutsProvider';
import { useMobileNavigationContext } from '@/Components/Providers/MobileNavigationProvider';
import { useNotificationsContext } from '@/Components/Providers/NotificationsProvider';
import { ApplicationLogo } from '@/Components/UI/Icons';
import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';

function NavItem({
    isActive = false,
    href,
    keySequence = undefined,
    label,
}: {
    isActive?: boolean;
    href: string;
    keySequence?: string[] | undefined;
    label: string;
}) {
    const { registerKeyboardShortcut, unregisterKeyboardShortcut } =
        useKeyboardShortcutsContext();
    const { setShowMobileNavigation } = useMobileNavigationContext();

    useEffect(() => {
        if (!keySequence || keySequence.length === 0) {
            return;
        }

        registerKeyboardShortcut({
            keySequence: keySequence,
            action: () => router.visit(href),
        });

        return () => unregisterKeyboardShortcut(keySequence);
    }, []);

    return (
        <Link
            className={
                'block rounded-md px-4 py-2 hover:bg-gray-700 ' +
                (isActive ? 'bg-gray-800' : '')
            }
            href={href}
            onClick={() => setShowMobileNavigation(false)}
        >
            <div className="flex items-center justify-between">
                <div>{label}</div>
                {keySequence && (
                    <div className="text-sm text-gray-400">
                        {keySequence.join('')}
                    </div>
                )}
            </div>
        </Link>
    );
}

function Sidebar() {
    const { showMobileNavigation } = useMobileNavigationContext();

    return (
        <div
            className={`z-10 h-full w-full space-y-6 bg-gray-900 p-4 md:static md:block md:w-64 md:flex-none xl:w-80 xl:space-y-8 xl:p-8 ${
                showMobileNavigation ? 'absolute' : 'hidden'
            }`}
        >
            <div className="flex items-end gap-2">
                <ApplicationLogo className="h-14 fill-current text-gray-100" />
                <div>
                    <div className="text-4xl font-bold">Skeer</div>
                    <div className="text-sm text-gray-400">
                        (Dutch slang for 'broke')
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <NavItem
                    href={route('dashboard')}
                    isActive={route().current('dashboard')}
                    keySequence={['g', 'd']}
                    label="Dashboard"
                />

                <NavItem
                    href={route('reports')}
                    isActive={route().current('reports')}
                    keySequence={['g', 'r']}
                    label="Reports"
                />

                <div>
                    <hr className="my-4 border-gray-700" />
                </div>

                <NavItem
                    href={route('accounts.index')}
                    isActive={route().current('accounts.*')}
                    keySequence={['g', 'a']}
                    label="Accounts"
                />

                <NavItem
                    href={route('categories.index')}
                    isActive={route().current('categories.*')}
                    keySequence={['g', 'c']}
                    label="Categories"
                />

                <NavItem
                    href={route('transactions.index')}
                    isActive={route().current('transactions.*')}
                    keySequence={['g', 't']}
                    label="Transactions"
                />

                <div>
                    <hr className="my-4 border-gray-700" />
                </div>

                <NavItem
                    href={route('profile.edit')}
                    isActive={route().current('profile.edit')}
                    keySequence={['g', 'p']}
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

function MobileFooter() {
    const { showMobileNavigation, setShowMobileNavigation } =
        useMobileNavigationContext();

    return (
        <div className="flex justify-evenly border-t border-gray-700 bg-gray-900 p-2 md:hidden">
            <Link
                className={`px-4 py-2 ${route().current('dashboard') ? 'bg-gray-800' : ''}`}
                href={route('dashboard')}
            >
                Dashboard
            </Link>
            <button
                className={`cursor-pointer px-4 py-2 ${showMobileNavigation ? 'bg-gray-800' : ''}`}
                onClick={() =>
                    setShowMobileNavigation((prevState) => !prevState)
                }
            >
                Menu
            </button>
            <Link
                className={`px-4 py-2 ${route().current('transactions.*') ? 'bg-gray-800' : ''}`}
                href={route('transactions.index')}
            >
                Transactions
            </Link>
        </div>
    );
}

export default function AppLayout({ children }: PropsWithChildren) {
    const { flash } = usePage().props;

    const { registerKeyboardShortcut, unregisterKeyboardShortcut } =
        useKeyboardShortcutsContext();
    const { showNotification } = useNotificationsContext();

    const [displayedFlashMessage, setDisplayedFlashMessage] = useState<
        string | null
    >(null);
    const [easterEggDogMode, setEasterEggDogMode] = useState<boolean>(false);

    useEffect(() => {
        if (!flash.notification) {
            return;
        }

        if (flash.notification.message === displayedFlashMessage) {
            return;
        }

        showNotification({
            message: flash.notification.message,
            type: flash.notification.type,
        });

        setDisplayedFlashMessage(flash.notification.message);
    }, [
        displayedFlashMessage,
        flash.notification,
        setDisplayedFlashMessage,
        showNotification,
    ]);

    const shortcuts: KeyboardShortcut[] = [
        {
            keySequence: ['c', 'a'],
            action: () => router.visit(route('accounts.create')),
        },
        {
            keySequence: ['i', 't'],
            action: () => router.visit(route('transactions.import')),
        },
        {
            keySequence: ['i', 'd', 'd', 'q', 'd'],
            action: () => {
                setEasterEggDogMode((prevState) => {
                    if (prevState) {
                        showNotification({
                            message: 'Dog mode deactivated!',
                            type: 'error',
                        });
                    } else {
                        showNotification({
                            message: 'Dog mode activated!',
                            type: 'success',
                        });
                    }

                    return !prevState;
                });
            },
        },
    ];

    useEffect(() => {
        shortcuts.forEach(({ keySequence, action }) => {
            registerKeyboardShortcut({
                keySequence: keySequence,
                action: action,
            });
        });

        return () => {
            shortcuts.forEach(({ keySequence }) =>
                unregisterKeyboardShortcut(keySequence),
            );
        };
    }, []);

    return (
        <div
            className={`flex h-dvh flex-col bg-gray-800 text-gray-100 ease-linear md:flex-row ${
                easterEggDogMode ? 'grayscale' : ''
            }`}
        >
            <div className="relative flex grow overflow-y-scroll">
                <Sidebar />

                <div className="grow overflow-y-scroll p-4 xl:p-8">
                    {children}
                </div>
            </div>

            <MobileFooter />
        </div>
    );
}
