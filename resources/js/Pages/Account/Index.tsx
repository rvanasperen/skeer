import { Button } from '@/Components/UI/Form';
import AppLayout from '@/Layouts/AppLayout';
import Account from '@/Models/Account';
import { Head, Link } from '@inertiajs/react';

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <AppLayout>
            <Head title="Accounts" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Accounts</div>

                {accounts.length === 0 ? (
                    <div className="text-gray-500">No accounts found</div>
                ) : (
                    accounts.map((account) => (
                        <div key={account.id}>
                            <div>{account.name}</div>
                            <div>{account.number}</div>
                        </div>
                    ))
                )}

                <Link className="block" href={route('accounts.create')}>
                    <Button>Create Account</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
