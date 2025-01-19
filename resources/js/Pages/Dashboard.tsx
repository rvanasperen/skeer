import NetWorthCard from '@/Components/Dashboard/NetWorthCard';
import NetWorthChartCard from '@/Components/Dashboard/NetWorthChartCard';
import TransactionsChartCard from '@/Components/Dashboard/TransactionsChartCard';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    accounts,
    transactionData,
}: {
    accounts: Account[];
    transactionData: { date: string; amount: number }[];
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Dashboard</div>

                <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-3 flex flex-col gap-8">
                        <NetWorthChartCard netWorthData={[]} />

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
