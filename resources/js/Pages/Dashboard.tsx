import BalanceHistoryChartCard from '@/Components/Charts/BalanceHistoryChartCard';
import BalanceSummaryCard from '@/Components/Dashboard/BalanceSummaryCard';
import { Card } from '@/Components/UI';
import AppLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    accounts,
    balanceOverTimeData,
}: PageProps<{
    accounts: Account[];
    balanceOverTimeData: { date: string; delta: number; balance: number }[];
}>) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-3xl font-bold">Dashboard</div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Card>todo: table with categories</Card>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <BalanceSummaryCard accounts={accounts} />

                        <Card>
                            <div>todo: tasks</div>
                            <div>
                                - if transactions with no category, create rules
                                for them
                            </div>
                            <div>
                                - if last import &gt;= 7? days ago, ask user for
                                new import
                            </div>
                        </Card>

                        <BalanceHistoryChartCard
                            className="col-span-2"
                            data={balanceOverTimeData}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
