import NetWorthCard from '@/Components/Dashboard/NetWorthCard';
import NetWorthChartCard from '@/Components/Dashboard/NetWorthChartCard';
import TransactionsChartCard from '@/Components/Dashboard/TransactionsChartCard';
import { Card } from '@/Components/UI';
import { Button, Input, Select } from '@/Components/UI/Form';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({
    accounts,
    netWorthData,
    transactionData,
    startDate,
    endDate,
    groupBy,
}: {
    accounts: Account[];
    netWorthData: {
        total: { date: string; amount: number }[];
        account: { date: string; amount: number }[][];
    };
    transactionData: { date: string; amount: number }[];
    startDate: string;
    endDate: string;
    groupBy: 'day' | 'week' | 'month' | 'year';
}) {
    const [selectedStartDate, setSelectedStartDate] =
        useState<string>(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState<string>(endDate);
    const [selectedGroupBy, setSelectedGroupBy] = useState<
        'day' | 'week' | 'month' | 'year'
    >(groupBy);

    const handleFilter = () => {
        router.get(route('dashboard'), {
            start_date: selectedStartDate,
            end_date: selectedEndDate,
            group_by: selectedGroupBy,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Dashboard</div>

                    <div className="flex items-center gap-2">
                        <Input
                            onChange={(e) =>
                                setSelectedStartDate(e.target.value)
                            }
                            type="date"
                            value={selectedStartDate}
                        />
                        <div>to</div>
                        <Input
                            onChange={(e) => setSelectedEndDate(e.target.value)}
                            type="date"
                            value={selectedEndDate}
                        />
                        <Select
                            onChange={(e) =>
                                setSelectedGroupBy(
                                    e.target.value as
                                        | 'day'
                                        | 'week'
                                        | 'month'
                                        | 'year',
                                )
                            }
                            value={selectedGroupBy}
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </Select>
                        <Button onClick={handleFilter}>Filter</Button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <NetWorthChartCard
                        className="col-span-9"
                        netWorthData={netWorthData}
                    />
                    <NetWorthCard className="col-span-3" accounts={accounts} />

                    <div className="col-span-6">
                        <Card>todo: table with categories</Card>
                    </div>

                    <div className="col-span-6">
                        <TransactionsChartCard
                            transactionData={transactionData}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
