import { useNotificationsContext } from '@/Components/Providers/NotificationsProvider';
import { Card } from '@/Components/UI';
import { Button, Input, InputError, Label, Select } from '@/Components/UI/Form';
import AppLayout from '@/Layouts/AppLayout';
import { Bank, Currency } from '@/Models';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Import({
    banks,
    currencies,
}: {
    banks: Bank[];
    currencies: Currency[];
}) {
    const { showNotification } = useNotificationsContext();

    const { data, setData, post, errors, processing } = useForm<{
        bank_id: number | '';
        currency_id: number | '';
        file?: File;
    }>({
        bank_id: '',
        currency_id: '',
        file: undefined,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('transactions.import'), {
            onSuccess: () => {
                showNotification({
                    message: 'Transactions imported!',
                    type: 'success',
                });
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Import Transactions" />

            <div className="max-w-xl space-y-8">
                <div className="text-3xl font-bold">Import Transactions</div>

                <Card>
                    <div className="text-lg">Import Transactions</div>

                    <div className="mt-1 text-sm text-gray-400">
                        Import your transactions from a CSV file.
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <Label htmlFor="bank" value="Bank" />
                            <Select
                                autoFocus={true}
                                className="mt-1 block w-full"
                                id="bank"
                                onChange={(e) =>
                                    setData('bank_id', parseInt(e.target.value))
                                }
                                required={true}
                                value={data.bank_id}
                            >
                                <option value="">Select a bank</option>
                                {banks.map((bank) => (
                                    <option key={bank.id} value={bank.id}>
                                        {bank.name}
                                    </option>
                                ))}
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.bank_id}
                            />
                        </div>

                        <div>
                            <Label htmlFor="currency" value="Currency" />
                            <Select
                                className="mt-1 block w-full"
                                id="currency"
                                onChange={(e) =>
                                    setData(
                                        'currency_id',
                                        parseInt(e.target.value),
                                    )
                                }
                                required={true}
                                value={data.currency_id}
                            >
                                <option value="">Select a currency</option>
                                {currencies.map((currency) => (
                                    <option
                                        key={currency.id}
                                        value={currency.id}
                                    >
                                        {currency.name} ({currency.code})
                                    </option>
                                ))}
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.currency_id}
                            />
                        </div>

                        <div>
                            <Label htmlFor="file" value="CSV File" />
                            <Input
                                accept=".csv, text/csv"
                                className="mt-1 block w-full"
                                id="file"
                                onChange={(e) =>
                                    setData('file', e.target.files?.[0])
                                }
                                required={true}
                                type="file"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.file}
                            />
                        </div>

                        <Button disabled={processing}>
                            Import Transactions
                        </Button>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
