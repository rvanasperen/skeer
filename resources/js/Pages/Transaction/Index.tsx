import { Card } from '@/Components/UI';
import { Button } from '@/Components/UI/Form';
import { TransactionType } from '@/Enums';
import AppLayout from '@/Layouts/AppLayout';
import { Transaction } from '@/Models';
import { Head, Link } from '@inertiajs/react';

export default function Index({
    transactions,
}: {
    transactions: Transaction[];
}) {
    return (
        <AppLayout>
            <Head title="Transactions" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Transactions</div>

                    <Link
                        className="inline-block"
                        href={route('transactions.import')}
                    >
                        <Button>Import Transactions</Button>
                    </Link>
                </div>

                {transactions.length === 0 && (
                    <div className="text-gray-400">No transactions found</div>
                )}

                {transactions.length > 0 && (
                    <Card>
                        <table className="w-full">
                            <thead className="text-lg">
                                <tr>
                                    <th className="p-4 text-start">Account</th>
                                    <th className="p-4 text-start">Name</th>
                                    <th className="p-4 text-center">
                                        Category
                                    </th>
                                    <th className="p-4 text-end">Amount</th>
                                    <th className="p-4 text-center">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-t border-gray-800 last:border-b hover:bg-gray-800"
                                    >
                                        <td className="p-4 text-start">
                                            <div>
                                                {transaction.account?.name}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {transaction.account?.number}
                                            </div>
                                        </td>
                                        <td className="p-4 text-start">
                                            <div>{transaction.name}</div>
                                            {transaction.counterparty && (
                                                <div className="text-sm text-gray-400">
                                                    {transaction.counterparty}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {transaction.category?.name}
                                        </td>
                                        <td className="p-4 text-end">
                                            {transaction.type ===
                                                TransactionType.Expense && (
                                                <span className="text-red-500">
                                                    -
                                                    {new Intl.NumberFormat(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency:
                                                                transaction
                                                                    .account
                                                                    ?.currency
                                                                    ?.code,
                                                        },
                                                    ).format(
                                                        transaction.amount,
                                                    )}
                                                </span>
                                            )}

                                            {transaction.type ===
                                                TransactionType.Income && (
                                                <span className="text-green-500">
                                                    +
                                                    {new Intl.NumberFormat(
                                                        'en-US',
                                                        {
                                                            style: 'currency',
                                                            currency:
                                                                transaction
                                                                    .account
                                                                    ?.currency
                                                                    ?.code,
                                                        },
                                                    ).format(
                                                        transaction.amount,
                                                    )}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {
                                                new Date(
                                                    transaction.transaction_date,
                                                )
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
