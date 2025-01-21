import BalanceHistoryChartCard from '@/Components/Charts/BalanceHistoryChartCard';
import BalanceSummaryCard from '@/Components/Dashboard/BalanceSummaryCard';
import TasksCard from '@/Components/Dashboard/TasksCard';
import { Card } from '@/Components/UI';
import AppLayout from '@/Layouts/AppLayout';
import { Account } from '@/Models';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface CategoryData {
    id: number;
    name: string;
    spent: number;
    children?: CategoryData[];
}

export default function Dashboard({
    accounts,
    balanceOverTimeData,
    categoryData,
    tasks,
}: PageProps<{
    accounts: Account[];
    balanceOverTimeData: { date: string; delta: number; balance: number }[];
    categoryData: CategoryData[];
    tasks: { name: string; description: string; route: string }[];
}>) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-3xl font-bold">Dashboard</div>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Card className="space-y-4">
                            <div className="text-2xl">Category Summary</div>

                            <div>(work in progress)</div>

                            <div className="space-y-4">
                                {categoryData.map((category) => (
                                    <div key={category.id}>
                                        <div>
                                            {category.name}: {category.spent}
                                        </div>

                                        {category.children && (
                                            <div className="pl-4">
                                                {category.children.map(
                                                    (childCategory) => (
                                                        <div
                                                            key={
                                                                childCategory.id
                                                            }
                                                        >
                                                            {childCategory.name}
                                                            :{' '}
                                                            {
                                                                childCategory.spent
                                                            }
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-2">
                                <BalanceHistoryChartCard
                                    data={balanceOverTimeData}
                                />
                            </div>

                            <TasksCard tasks={tasks} />

                            <BalanceSummaryCard accounts={accounts} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
