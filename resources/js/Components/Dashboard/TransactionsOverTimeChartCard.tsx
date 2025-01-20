import { Card } from '@/Components/UI';
import { HTMLAttributes } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function TransactionsOverTimeChartCard({
    className = '',
    data,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    data: { date: string; amount: number }[];
}) {
    const processedData = data.map((transaction) => ({
        ...transaction,
        fill: transaction.amount >= 0 ? '#82ca8d' : '#ff6b6b',
    }));

    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <div className="text-xl">Transactions</div>

            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={processedData}>
                    <CartesianGrid stroke="#4a5568" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        stroke="#e2e8f0"
                        tick={{ fill: '#e2e8f0' }}
                    />
                    <YAxis
                        dataKey="amount"
                        stroke="#e2e8f0"
                        tick={{ fill: '#e2e8f0' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#2d3748',
                            borderColor: '#4a5568',
                            color: '#e2e8f0',
                        }}
                        cursor={{ fill: '#4a5568' }}
                        formatter={(value: number) => [
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(value),
                            'Amount',
                        ]}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <ReferenceLine y={0} stroke="#e2e8f0" />
                    <Bar dataKey="amount" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
