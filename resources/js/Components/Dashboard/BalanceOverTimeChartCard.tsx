import { Card } from '@/Components/UI';
import { HTMLAttributes } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function BalanceOverTimeChartCard({
    className = '',
    data,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    data: { date: string; delta: number; balance: number }[];
}) {
    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <div className="text-xl">Net Worth</div>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#4a5568" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        stroke="#e2e8f0"
                        tick={{ fill: '#e2e8f0' }}
                    />
                    <YAxis
                        dataKey="balance"
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
                            'Net Worth',
                        ]}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <ReferenceLine y={0} stroke="#e2e8f0" />
                    <Line dataKey="balance" stroke="#82ca8d" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
