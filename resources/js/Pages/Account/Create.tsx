import { Card } from '@/Components/UI';
import { Button, Input, InputError, Label, Select } from '@/Components/UI/Form';
import AppLayout from '@/Layouts/AppLayout';
import { Bank, Currency } from '@/Models';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function Create({
    banks,
    currencies,
}: {
    banks: Bank[];
    currencies: Currency[];
}) {
    const bankSelectRef = useRef<HTMLSelectElement>(null);

    const {
        data,
        errors,
        post,
        processing,
        recentlySuccessful,
        reset,
        setData,
    } = useForm<{
        bank_id: number | '';
        currency_id: number | '';
        name: string;
        number: string;
        type: string;
        balance: number;
    }>({
        bank_id: '',
        currency_id: '',
        name: '',
        number: '',
        type: '',
        balance: 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('accounts.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                bankSelectRef.current?.focus();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Account" />

            <div className="max-w-xl space-y-8">
                <h2 className="text-xl font-bold">Create Account</h2>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="bank" value="Bank" />
                            <Select
                                autoFocus={true}
                                className="mt-1 block w-full"
                                id="bank"
                                onChange={(e) =>
                                    setData('bank_id', parseInt(e.target.value))
                                }
                                ref={bankSelectRef}
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
                            <Label htmlFor="name" value="Name" />
                            <Input
                                autoComplete="off"
                                className="mt-1 block w-full"
                                id="name"
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Primary Checking"
                                required={true}
                                type="text"
                                value={data.name}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <Label htmlFor="number" value="Number (IBAN)" />
                            <Input
                                autoComplete="off"
                                className="mt-1 block w-full"
                                id="number"
                                onChange={(e) =>
                                    setData('number', e.target.value)
                                }
                                placeholder="NL00INGB0001234567"
                                required={true}
                                type="text"
                                value={data.number}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.number}
                            />
                        </div>

                        <div>
                            <Label htmlFor="type" value="Type" />
                            <Select
                                className="mt-1 block w-full"
                                id="type"
                                onChange={(e) =>
                                    setData('type', e.target.value)
                                }
                                required={true}
                                value={data.type}
                            >
                                <option value="">Select a type</option>
                                <option value="checking">Checking</option>
                                <option value="savings">Savings</option>
                            </Select>
                            <InputError
                                className="mt-2"
                                message={errors.type}
                            />
                        </div>

                        <div>
                            <Label htmlFor="balance" value="Balance" />
                            <Input
                                className="mt-1 block w-full"
                                id="balance"
                                onChange={(e) =>
                                    setData(
                                        'balance',
                                        parseFloat(e.target.value),
                                    )
                                }
                                placeholder="1000"
                                required={true}
                                step="0.01"
                                type="number"
                                value={data.balance}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.balance}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>
                                Create Account
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-green-400">
                                    Account created!
                                </p>
                            </Transition>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
