import { Card } from '@/Components/UI';
import { Account, Currency } from '@/Models';
import { HTMLAttributes } from 'react';

export default function BalanceSummaryCard({
    accounts,
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    accounts: Account[];
}) {
    const enabledCurrencies = Array.from(
        new Set(accounts.map((account) => account.currency?.code)),
    );

    const formatterByCurrency: Record<string, Intl.NumberFormat> = {};
    const balanceByCurrency: Record<string, number> = {};

    if (enabledCurrencies.length > 0) {
        enabledCurrencies.forEach((currencyCode) => {
            if (currencyCode === undefined) {
                return;
            }

            formatterByCurrency[currencyCode] = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currencyCode,
            });

            balanceByCurrency[currencyCode] = accounts.reduce(
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
        <Card {...props} className={`space-y-4 ${className}`}>
            <div>
                <div className="text-2xl">Balance Summary</div>
                <div>
                    {Object.keys(balanceByCurrency).map(
                        (currencyCode, index) => (
                            <div key={index}>
                                {currencyCode}:{' '}
                                {balanceByCurrency[currencyCode] >= 0 && (
                                    <span className="text-green-500">
                                        {formatterByCurrency[
                                            currencyCode
                                        ].format(
                                            balanceByCurrency[currencyCode],
                                        )}
                                    </span>
                                )}
                                {balanceByCurrency[currencyCode] < 0 && (
                                    <span className="text-red-500">
                                        {formatterByCurrency[
                                            currencyCode
                                        ].format(
                                            balanceByCurrency[currencyCode],
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
                        {account.balance >= 0 && (
                            <span className="text-green-500">
                                {formatterByCurrency[
                                    (account.currency as Currency).code
                                ].format(account.balance)}
                            </span>
                        )}
                        {account.balance < 0 && (
                            <span className="text-red-500">
                                {formatterByCurrency[
                                    (account.currency as Currency).code
                                ].format(account.balance)}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
