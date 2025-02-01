import {
    KeyboardShortcut,
    useKeyboardShortcutsContext,
} from '@/Components/Providers/KeyboardShortcutsProvider';
import FiltersCard from '@/Components/Transaction/FiltersCard';
import TransactionsTableCard from '@/Components/Transaction/TransactionsTableCard';
import { Button } from '@/Components/UI/Form';
import { PaginatedData } from '@/Data';
import { Account, Category, Currency, Transaction } from '@/Models';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Index({
    accounts,
    categories,
    currencies,
    transactions,
}: {
    accounts: Account[];
    categories: Category[];
    currencies: Currency[];
    transactions: PaginatedData<Transaction>;
}) {
    const { registerKeyboardShortcut, unregisterKeyboardShortcut } =
        useKeyboardShortcutsContext();

    useEffect(() => {
        const shortcuts: KeyboardShortcut[] = [
            {
                keySequence: ['h'],
                action: () => {
                    if (transactions.prev_page_url) {
                        router.visit(transactions.prev_page_url);
                    }
                },
            },
            {
                keySequence: ['l'],
                action: () => {
                    if (transactions.next_page_url) {
                        router.visit(transactions.next_page_url);
                    }
                },
            },
        ];

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
    }, [transactions]);

    return (
        <>
            <Head title="Transactions" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Transactions</div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        {transactions.total === 0 && (
                            <div className="text-gray-400">
                                No transactions found
                            </div>
                        )}

                        {transactions.total > 0 && (
                            <TransactionsTableCard
                                transactions={transactions}
                            />
                        )}
                    </div>
                    <div className="col-span-1 space-y-8">
                        <Link href={route('transactions.import')}>
                            <Button className="flex w-full items-center justify-center gap-2">
                                <div>Import Transactions</div>
                                <div className="text-sm text-gray-400">it</div>
                            </Button>
                        </Link>

                        {transactions.total > 0 && (
                            <FiltersCard
                                accounts={accounts}
                                categories={categories}
                                currencies={currencies}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
