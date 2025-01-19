import { Button } from '@/Components/UI/Form';
import AppLayout from '@/Layouts/AppLayout';
import Account from '@/Models/Account';
import { Head, Link } from '@inertiajs/react';
import { Card } from '@/Components/UI';
import AccountCard from "@/Components/Account/AccountCard";

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <AppLayout>
            <Head title="Accounts" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Accounts</div>

                {accounts.length === 0 ? (
                    <div className="text-gray-500">No accounts found</div>
                ) : (
                    <div className="grid grid-cols-2 gap-8">
                        {accounts.map((account) => (
                            <AccountCard account={account} key={account.id} />
                        ))}
                    </div>
                )}

                <Link className="block" href={route('accounts.create')}>
                    <Button>Create Account</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
