import AppLayout from '@/Layouts/AppLayout';
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
        <AppLayout>
            <Head title="Create Account" />

            <div>Account Create page</div>

            <div className="mt-2">
                banks: {JSON.stringify(banks)}
            </div>

            <div className="mt-2">
                currencies: {JSON.stringify(currencies)}
            </div>
        </AppLayout>
    );
}
