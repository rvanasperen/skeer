import { Card } from '@/Components/UI';
import AuthenticatedLayout from '@/Layouts/AppLayout';
import { Account, Currency } from '@/Models';
import { Head } from '@inertiajs/react';

export default function Dashboard({ accounts }: { accounts: Account[] }) {
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

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                <div className="text-xl font-bold">Dashboard</div>

                <div className="grid grid-cols-4 gap-8">
                    <Card className="col-span-3">graph</Card>

                    <Card className="space-y-4">
                        <div>
                            <div className="text-2xl">Net worth</div>
                            <div>
                                {Object.keys(networthByCurrency).map(
                                    (currencyCode, index) => (
                                        <div key={index}>
                                            {currencyCode}:{' '}
                                            {networthByCurrency[currencyCode] >
                                                0 && (
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
                                            {networthByCurrency[currencyCode] <=
                                                0 && (
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
        </AuthenticatedLayout>
    );
}
