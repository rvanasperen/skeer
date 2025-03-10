import BalanceHistoryChartCard from '@/Components/Charts/BalanceHistoryChartCard';
import MoneyFlowChartCard from '@/Components/Charts/MoneyFlowChartCard';
import { DateRangeGroupFilter } from '@/Components/UI';
import { BalanceOverTimeData, TransactionsOverTimeData } from '@/Data';
import { GroupBy } from '@/Enums';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Reports({
    startDate,
    endDate,
    groupBy,
    balanceOverTimeData,
    transactionsOverTimeData,
}: PageProps<{
    startDate: string;
    endDate: string;
    groupBy: GroupBy;
    balanceOverTimeData: BalanceOverTimeData[];
    transactionsOverTimeData: TransactionsOverTimeData[];
}>) {
    const handleFilter = (
        startDate: string,
        endDate: string,
        groupBy: GroupBy,
    ) => {
        router.get(route('reports'), {
            start_date: startDate,
            end_date: endDate,
            group_by: groupBy,
        });
    };

    return (
        <>
            <Head title="Reports" />

            <div className="space-y-4 xl:space-y-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                    <div className="text-3xl font-bold">Reports</div>

                    <DateRangeGroupFilter
                        startDate={startDate}
                        endDate={endDate}
                        groupBy={groupBy}
                        onFilter={handleFilter}
                    />
                </div>

                <div className="grid gap-4 xl:grid-cols-2 xl:gap-8">
                    <BalanceHistoryChartCard
                        data={balanceOverTimeData}
                        height={300}
                    />

                    <MoneyFlowChartCard
                        data={transactionsOverTimeData}
                        height={300}
                    />
                </div>
            </div>
        </>
    );
}
