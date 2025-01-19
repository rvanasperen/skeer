import { Card } from '@/Components/UI';
import { Account, Currency } from '@/Models';
import { HTMLAttributes } from 'react';

export default function NetWorthCard({
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
        <Card {...props} className={`space-y-4 ${className}`}>
            <div>
                <div className="text-2xl">Net Worth</div>
                <div>
                    {Object.keys(networthByCurrency).map(
                        (currencyCode, index) => (
                            <div key={index}>
                                {currencyCode}:{' '}
                                {networthByCurrency[currencyCode] > 0 && (
                                    <span className="text-green-500">
                                        {formatterByCurrency[
                                            currencyCode
                                        ].format(
                                            networthByCurrency[currencyCode],
                                        )}
                                    </span>
                                )}
                                {networthByCurrency[currencyCode] <= 0 && (
                                    <span className="red">
                                        {formatterByCurrency[
                                            currencyCode
                                        ].format(
                                            networthByCurrency[currencyCode],
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
    );
}
