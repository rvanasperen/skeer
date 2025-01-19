import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Transaction } from "@/Models";
import { Button } from "@/Components/UI/Form";

export default function Index({
    transactions,
}: {
    transactions: Transaction[];
}) {
    return (
        <AppLayout>
            <Head title="Transactions" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Transactions</div>

                {transactions.length === 0 ? (
                    <div className="text-gray-500">No transactions found</div>
                ) : (
                    <div className="grid grid-cols-2 gap-8">
                        {transactions.map((transaction) => (
                            <div key={transaction.id}>
                                transaction
                                {/*<TransactionCard transaction={transaction} key={transaction.id} />*/}
                            </div>
                        ))}
                    </div>
                )}

                <Link className="block" href={route('transactions.create')}>
                    <Button>Import Transactions</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
