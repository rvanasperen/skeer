import AppLayout from '@/Layouts/AppLayout';
import Account from '@/Models/Account';
import { Head } from '@inertiajs/react';

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <AppLayout>
            <Head title="Accounts" />

            <div>Account Index page</div>

            <div>
                {accounts.length > 0 ? (
                    accounts.map((account) => (
                        <div key={account.id}>
                            <div>{account.name}</div>
                            <div>{account.number}</div>
                        </div>
                    ))
                ) : (
                    <div>No accounts found</div>
                )}
            </div>
        </AppLayout>
    );
}
