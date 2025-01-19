import NetWorthCard from '@/Components/Dashboard/NetWorthCard';
import TransactionsChartCard from '@/Components/Dashboard/TransactionsChartCard';
import { Card } from '@/Components/UI';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { Head } from '@inertiajs/react';

interface TransactionData {
    date: string;
    total_amount: number;
}

export default function Dashboard({
    accounts,
    transactionData,
}: {
    accounts: Account[];
    transactionData: TransactionData[];
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Dashboard</div>

                <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-3 flex flex-col gap-8">
                        <Card className="col-span-3">
                            <div className="text-xl">Net Worth</div>
                        </Card>

                        <TransactionsChartCard
                            transactionData={transactionData}
                        />
                    </div>

                    <div>
                        <NetWorthCard accounts={accounts} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
