import { Button, Input, InputError, Label, Select } from '@/Components/UI/Form';
import { Account, Bank, Currency } from '@/Models';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, FormHTMLAttributes } from 'react';

export default function AccountForm({
    account,
    banks,
    currencies,
    className = '',
    ...props
}: FormHTMLAttributes<HTMLFormElement> & {
    account?: Account;
    banks: Bank[];
    currencies: Currency[];
}) {
    const { data, errors, post, put, processing, setData } = useForm<{
        bank_id: number | '';
        currency_id: number | '';
        name: string;
        number: string;
        type: string;
        current_balance: number | '';
    }>({
        bank_id: account?.bank_id || '',
        currency_id: account?.currency_id || '',
        name: account?.name || '',
        number: account?.number || '',
        type: account?.type || '',
        current_balance: account ? parseFloat(account.balance.toFixed(2)) : '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (account) {
            put(route('accounts.update', account.id));
        } else {
            post(route('accounts.store'));
        }
    };

    return (
        <form
            {...props}
            className={`space-y-4 ${className}`}
            onSubmit={handleSubmit}
        >
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
                <InputError className="mt-2" message={errors.bank_id} />
            </div>

            <div>
                <Label htmlFor="currency" value="Currency" />
                <Select
                    className="mt-1 block w-full"
                    id="currency"
                    onChange={(e) =>
                        setData('currency_id', parseInt(e.target.value))
                    }
                    required={true}
                    value={data.currency_id}
                >
                    <option value="">Select a currency</option>
                    {currencies.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                            {currency.name} ({currency.code})
                        </option>
                    ))}
                </Select>
                <InputError className="mt-2" message={errors.currency_id} />
            </div>

            <div>
                <Label htmlFor="name" value="Name" />
                <Input
                    autoComplete="off"
                    className="mt-1 block w-full"
                    id="name"
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Primary Checking"
                    required={true}
                    type="text"
                    value={data.name}
                />
                <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
                <Label htmlFor="number" value="Number (usually IBAN)" />
                <Input
                    autoComplete="off"
                    className="mt-1 block w-full"
                    id="number"
                    onChange={(e) => setData('number', e.target.value)}
                    placeholder="NL00INGB0001234567"
                    required={true}
                    type="text"
                    value={data.number}
                />
                <InputError className="mt-2" message={errors.number} />
            </div>

            <div>
                <Label htmlFor="type" value="Type" />
                <Select
                    className="mt-1 block w-full"
                    id="type"
                    onChange={(e) => setData('type', e.target.value)}
                    required={true}
                    value={data.type}
                >
                    <option value="">Select a type</option>
                    <option value="Checking">Checking</option>
                    <option value="Saving">Saving</option>
                </Select>
                <InputError className="mt-2" message={errors.type} />
            </div>

            {account && (
                <div>
                    <Label htmlFor="current_balance" value="Current Balance" />
                    <Input
                        autoComplete="off"
                        className="mt-1 block w-full"
                        id="current_balance"
                        onChange={(e) =>
                            setData(
                                'current_balance',
                                parseFloat(e.target.value),
                            )
                        }
                        placeholder="1000"
                        required={true}
                        step="0.01"
                        type="number"
                        value={data.current_balance}
                    />
                    <div className="mt-2 text-sm text-gray-400">
                        The opening balance of the account will be updated to
                        make sure the current value is correct.
                    </div>
                    <InputError
                        className="mt-2"
                        message={errors.current_balance}
                    />
                </div>
            )}

            <Button disabled={processing}>
                {account ? 'Update Account' : 'Create Account'}
            </Button>
        </form>
    );
}
