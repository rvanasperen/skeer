import { Card } from '@/Components/UI';
import { Button } from '@/Components/UI/Form';
import { Account } from '@/Models';
import { Link } from '@inertiajs/react';

export default function AccountCard({
    account,
    ...props
}: {
    account: Account;
}) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: account.currency?.code,
    });

    return (
        <Card {...props}>
            <div className="flex">
                <div className="grow">
                    <div className="text-xl">{account.name}</div>
                    <div className="text-sm text-gray-400">
                        <div>{account.number}</div>
                        <div>{account.type} account</div>
                    </div>

                    <div className="mt-4 text-xl">
                        Balance:{' '}
                        {account.balance >= 0 && (
                            <span className="text-green-500">
                                {formatter.format(account.balance)}
                            </span>
                        )}
                        {account.balance < 0 && (
                            <span className="text-red-500">
                                {formatter.format(account.balance)}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 flex gap-4">
                        {/*<Link
                            className="block"
                            href={route('accounts.show', account.id)}
                        >
                            <Button>View</Button>
                        </Link>*/}

                        <Link
                            className="block"
                            href={route('accounts.edit', account.id)}
                        >
                            <Button>Edit</Button>
                        </Link>

                        {/*<Link
                            className="block"
                            href={route('accounts.destroy', account.id)}
                            method="delete"
                        >
                            <Button theme="danger">Delete</Button>
                        </Link>*/}
                    </div>
                </div>
                <div className="flex flex-shrink-0 flex-col items-center">
                    <img
                        alt="Bank Logo"
                        className="size-16"
                        src={`/assets/images/banks/logos/${account.bank?.bic}.png`}
                    />
                    <div className="mt-1 text-sm text-gray-400">
                        {account.bank?.name}
                    </div>
                </div>
            </div>
        </Card>
    );
}
