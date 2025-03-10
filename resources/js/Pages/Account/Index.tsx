import AccountCard from '@/Components/Account/AccountCard';
import { Button } from '@/Components/UI/Form';
import Account from '@/Models/Account';
import { Head, Link } from '@inertiajs/react';

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <>
            <Head title="Accounts" />

            <div className="space-y-4 xl:space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Accounts</div>

                    <Link
                        className="inline-block"
                        href={route('accounts.create')}
                    >
                        <Button>Create Account</Button>
                    </Link>
                </div>

                {accounts.length === 0 && (
                    <div className="text-gray-400">No accounts found</div>
                )}

                {accounts.length > 0 && (
                    <div className="grid gap-4 xl:grid-cols-2 xl:gap-8">
                        {accounts.map((account) => (
                            <AccountCard account={account} key={account.id} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
