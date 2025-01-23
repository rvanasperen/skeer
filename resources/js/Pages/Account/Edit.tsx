import AccountForm from '@/Components/Account/AccountForm';
import { Card } from '@/Components/UI';
import { Account, Bank, Currency } from '@/Models';
import { Head } from '@inertiajs/react';

export default function Edit({
    account,
    banks,
    currencies,
}: {
    account: Account;
    banks: Bank[];
    currencies: Currency[];
}) {
    return (
        <>
            <Head title={`Edit Account - ${account.name}`} />

            <div className="max-w-xl space-y-8">
                <h2 className="text-3xl font-bold">Edit Account</h2>

                <Card>
                    <AccountForm
                        account={account}
                        banks={banks}
                        currencies={currencies}
                    />
                </Card>
            </div>
        </>
    );
}
