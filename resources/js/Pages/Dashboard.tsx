import BalanceOverTimeChartCard from '@/Components/Dashboard/BalanceOverTimeChartCard';
import BalanceSummaryCard from '@/Components/Dashboard/BalanceSummaryCard';
import TransactionsOverTimeChartCard from '@/Components/Dashboard/TransactionsOverTimeChartCard';
import { Card } from '@/Components/UI';
import DateRangeGroupFilter from '@/Components/UI/DateRangeGroupFilter';
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

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-9">
                        <BalanceOverTimeChartCard data={balanceOverTimeData} />
                    </div>
                    <div className="col-span-3">
                        <BalanceSummaryCard accounts={accounts} />
                    </div>

                    <div className="col-span-6">
                        <Card>todo: table with categories</Card>
                    </div>

                    <div className="col-span-6">
                        <TransactionsOverTimeChartCard
                            data={transactionsOverTimeData}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
