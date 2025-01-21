import { Card } from '@/Components/UI';
import { Button, Input, Label, Select } from '@/Components/UI/Form';
import { TransactionType } from '@/Enums';
import { Account, Category, Currency } from '@/Models';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, HTMLAttributes } from 'react';

export default function FiltersCard({
    className = '',
    accounts,
    categories,
    currencies,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    accounts: Account[];
    categories: Category[];
    currencies: Currency[];
}) {
    const { data, processing, setData } = useForm<{
        account_id: number | '';
        amount_from: number | '';
        amount_to: number | '';
        category_id: number | '';
        currency_id: number | '';
        date_from: string;
        date_to: string;
        name: string;
        type: TransactionType | '';
    }>({
        account_id: '',
        amount_from: '',
        amount_to: '',
        category_id: '',
        currency_id: '',
        date_from: '',
        date_to: '',
        name: '',
        type: '',
    });

    const handleFilter: FormEventHandler = (e) => {
        e.preventDefault();

        router.get(route('transactions.index', data));
    };

    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <div className="text-2xl">Filters</div>

            <form className="space-y-4" onSubmit={handleFilter}>
                <div>
                    <Label htmlFor="account" value="Account" />
                    <Select
                        className="mt-1 block w-full"
                        id="account"
                        onChange={(e) =>
                            setData('account_id', parseInt(e.target.value))
                        }
                        value={data.account_id}
                    >
                        <option />
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="amount_from" value="Amount From" />
                        <Input
                            className="mt-1 block w-full"
                            id="amount_from"
                            onChange={(e) =>
                                setData(
                                    'amount_from',
                                    parseFloat(e.target.value),
                                )
                            }
                            step="0.01"
                            type="number"
                            value={data.amount_from}
                        />
                    </div>
                    <div>
                        <Label htmlFor="amount_to" value="To" />
                        <Input
                            className="mt-1 block w-full"
                            id="amount_to"
                            onChange={(e) =>
                                setData('amount_to', parseFloat(e.target.value))
                            }
                            step="0.01"
                            type="number"
                            value={data.amount_to}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="category" value="Category" />
                    <Select
                        className="mt-1 block w-full"
                        id="category"
                        onChange={(e) =>
                            setData('category_id', parseInt(e.target.value))
                        }
                        value={data.category_id}
                    >
                        <option />
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Label htmlFor="currency" value="Currency" />
                    <Select
                        className="mt-1 block w-full"
                        id="currency"
                        onChange={(e) =>
                            setData('currency_id', parseInt(e.target.value))
                        }
                        value={data.currency_id}
                    >
                        <option />
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.id}>
                                {currency.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="date_from" value="Date From" />
                        <Input
                            className="mt-1 block w-full"
                            id="date_from"
                            onChange={(e) =>
                                setData('date_from', e.target.value)
                            }
                            type="date"
                            value={data.date_from}
                        />
                    </div>
                    <div>
                        <Label htmlFor="date_to" value="To" />
                        <Input
                            className="mt-1 block w-full"
                            id="date_to"
                            onChange={(e) => setData('date_to', e.target.value)}
                            type="date"
                            value={data.date_to}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="name" value="Name" />
                    <Input
                        autoComplete="off"
                        className="mt-1 block w-full"
                        id="name"
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        value={data.name}
                    />
                </div>

                <div>
                    <Label htmlFor="type" value="Type" />
                    <Select
                        className="mt-1 block w-full"
                        id="type"
                        onChange={(e) =>
                            setData(
                                'type',
                                TransactionType[
                                    e.target
                                        .value as keyof typeof TransactionType
                                ],
                            )
                        }
                        value={data.type}
                    >
                        <option />
                        {Object.values(TransactionType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </div>

                <Button disabled={processing}>Filter</Button>
            </form>
        </Card>
    );
}
