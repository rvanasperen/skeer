import { Button } from '@/Components/UI/Form';
import AppLayout from '@/Layouts/AppLayout';
import Account from '@/Models/Account';
import { Head, Link } from '@inertiajs/react';
import { Card } from '@/Components/UI';

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
                            <Card key={account.id}>
                                <div>Name: {account.name}</div>
                                <div>Number: {account.number}</div>
                                <div>Bank: {account.bank?.name}</div>
                                <div>
                                    Currency: {account.currency?.name} (
                                    {account.currency?.code})
                                </div>

                                <div className="mt-4 flex gap-4">
                                    <Link
                                        className="block"
                                        href={route(
                                            'accounts.edit',
                                            account.id,
                                        )}
                                    >
                                        <Button>Edit</Button>
                                    </Link>

                                    <Link
                                        className="block"
                                        href={route(
                                            'accounts.destroy',
                                            account.id,
                                        )}
                                        method="delete"
                                    >
                                        <Button theme="danger">Delete</Button>
                                    </Link>
                                </div>
                            </Card>
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
