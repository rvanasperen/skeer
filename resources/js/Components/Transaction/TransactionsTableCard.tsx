import { Card, PaginationControls } from '@/Components/UI';
import { PaginatedData } from '@/Data';
import { TransactionType } from '@/Enums';
import { Transaction } from '@/Models';
import { HTMLAttributes } from 'react';

export default function TransactionsTableCard({
    className = '',
    transactions,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    transactions: PaginatedData<Transaction>;
}) {
    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <PaginationControls pagination={transactions} />

            <table className="w-full">
                <thead className="text-lg">
                    <tr>
                        <th className="p-4 text-start">Account</th>
                        <th className="p-4 text-start">Name</th>
                        <th className="p-4 text-center">Category</th>
                        <th className="p-4 text-end">Amount</th>
                        <th className="p-4 text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.data.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className="border-t border-gray-800 last:border-b hover:bg-gray-800"
                        >
                            <td className="p-4 text-start">
                                <div>{transaction.account?.name}</div>
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
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency:
                                                transaction.account?.currency
                                                    ?.code,
                                        }).format(transaction.amount)}
                                    </span>
                                )}

                                {transaction.type ===
                                    TransactionType.Income && (
                                    <span className="text-green-500">
                                        +
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency:
                                                transaction.account?.currency
                                                    ?.code,
                                        }).format(transaction.amount)}
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-center">
                                {
                                    new Date(transaction.transaction_date)
                                        .toISOString()
                                        .split('T')[0]
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationControls pagination={transactions} />
        </Card>
    );
}
