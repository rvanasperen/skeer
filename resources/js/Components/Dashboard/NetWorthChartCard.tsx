import { Card } from '@/Components/UI';
import { HTMLAttributes } from 'react';

export default function NetWorthChartCard({
    className = '',
    netWorthData,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    netWorthData: { date: string; amount: number }[];
}) {
    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <div className="text-xl">Net Worth</div>

            <div>chart here</div>
        </Card>
    );
}
