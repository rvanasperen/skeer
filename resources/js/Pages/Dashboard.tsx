import { Card } from '@/Components/UI';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account, Currency } from '@/Models';
import { Head } from '@inertiajs/react';
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

interface TransactionData {
    date: string;
    total_amount: number;
}

export default function Dashboard({
    accounts,
    transactionData,
}: {
    accounts: Account[];
    transactionData: TransactionData[];
}) {
    const enabledCurrencies = Array.from(
        new Set(accounts.map((account) => account.currency?.code)),
    );

    const formatterByCurrency: Record<string, Intl.NumberFormat> = {};
    const networthByCurrency: Record<string, number> = {};

    if (enabledCurrencies.length > 0) {
        enabledCurrencies.forEach((currencyCode) => {
            if (currencyCode === undefined) {
                return;
            }

            formatterByCurrency[currencyCode] = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currencyCode,
            });

            networthByCurrency[currencyCode] = accounts.reduce(
                (accumulator, account) =>
                    accumulator +
                    (account.currency?.code === currencyCode
                        ? account.balance
                        : 0),
                0,
            );
        });
    }

    const processedTransactionData = transactionData.map((transaction) => ({
        ...transaction,
        fill: transaction.total_amount >= 0 ? '#82ca8d' : '#ff6b6b',
    }));

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Dashboard</div>

                <div className="grid grid-cols-4 gap-8">
                    <div className="col-span-3 flex flex-col gap-8">
                        <Card className="col-span-3">
                            <div className="text-xl">Net Worth</div>
                        </Card>

                        <Card className="col-span-3">
                            <div className="text-xl">Transactions</div>

                            <ResponsiveContainer
                                className="mt-4"
                                width="100%"
                                height={400}
                            >
                                <BarChart data={processedTransactionData}>
                                    <CartesianGrid
                                        stroke="#4a5568"
                                        strokeDasharray="3 3"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#e2e8f0"
                                        tick={{ fill: '#e2e8f0' }}
                                    />
                                    <YAxis
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
                                            'Total Amount',
                                        ]}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <ReferenceLine y={0} stroke="#fc0" />
                                    <Bar dataKey="total_amount" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>

                    <div>
                        <Card className="space-y-4">
                            <div>
                                <div className="text-2xl">Net worth</div>
                                <div>
                                    {Object.keys(networthByCurrency).map(
                                        (currencyCode, index) => (
                                            <div key={index}>
                                                {currencyCode}:{' '}
                                                {networthByCurrency[
                                                    currencyCode
                                                ] > 0 && (
                                                    <span className="text-green-500">
                                                        {formatterByCurrency[
                                                            currencyCode
                                                        ].format(
                                                            networthByCurrency[
                                                                currencyCode
                                                            ],
                                                        )}
                                                    </span>
                                                )}
                                                {networthByCurrency[
                                                    currencyCode
                                                ] <= 0 && (
                                                    <span className="red">
                                                        {formatterByCurrency[
                                                            currencyCode
                                                        ].format(
                                                            networthByCurrency[
                                                                currencyCode
                                                            ],
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="text-xl">Accounts</div>
                                {accounts.map((account) => (
                                    <div key={account.id}>
                                        {account.name}:{' '}
                                        {formatterByCurrency[
                                            (account.currency as Currency).code
                                        ].format(account.balance)}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
