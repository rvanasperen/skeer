import AccountForm from '@/Components/Account/AccountForm';
import { Card } from '@/Components/UI';
import { Bank, Currency } from '@/Models';
import { Head } from '@inertiajs/react';

export default function Create({
    banks,
    currencies,
}: {
    banks: Bank[];
    currencies: Currency[];
}) {
    return (
        <>
            <Head title="Create Account" />

            <div className="max-w-xl space-y-4 xl:space-y-8">
                <h2 className="text-3xl font-bold">Create Account</h2>

                <Card>
                    <AccountForm banks={banks} currencies={currencies} />
                </Card>
            </div>
        </>
    );
}
