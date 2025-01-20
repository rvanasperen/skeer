import BalanceOverTimeChartCard from '@/Components/Dashboard/BalanceOverTimeChartCard';
import BalanceSummaryCard from '@/Components/Dashboard/BalanceSummaryCard';
import TransactionsOverTimeChartCard from '@/Components/Dashboard/TransactionsOverTimeChartCard';
import { Card, DateRangeGroupFilter } from '@/Components/UI';
import { GroupBy } from '@/Enums';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({
    startDate,
    endDate,
    groupBy,
    accounts,
    balanceOverTimeData,
    transactionsOverTimeData,
}: PageProps<{
    startDate: string;
    endDate: string;
    groupBy: GroupBy;
    accounts: Account[];
    balanceOverTimeData: { date: string; delta: number; balance: number }[];
    transactionsOverTimeData: { date: string; amount: number }[];
}>) {
    const handleFilter = (
        startDate: string,
        endDate: string,
        groupBy: GroupBy,
    ) => {
        router.get(route('dashboard'), {
            start_date: startDate,
            end_date: endDate,
            group_by: groupBy,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Dashboard</div>

                    <DateRangeGroupFilter
                        startDate={startDate}
                        endDate={endDate}
                        groupBy={groupBy}
                        onFilter={handleFilter}
                    />
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <BalanceSummaryCard accounts={accounts} />

                            <Card>
                                <div>todo: tasks</div>
                                <div>
                                    - if transactions with no category, create
                                    rules for them
                                </div>
                                <div>
                                    - if last import &gt;= 7? days ago, ask user
                                    for new import
                                </div>
                            </Card>
                        </div>

                        <Card>todo: table with categories</Card>
                    </div>
                    <div className="space-y-8">
                        <BalanceOverTimeChartCard data={balanceOverTimeData} />

                        <TransactionsOverTimeChartCard
                            data={transactionsOverTimeData}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
