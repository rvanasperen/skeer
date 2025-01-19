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
    return (
        <Card {...props}>
            <div>Name: {account.name}</div>
            <div>Number: {account.number}</div>
            <div>Bank: {account.bank?.name}</div>
            <div>
                Currency: {account.currency?.name} ({account.currency?.code})
            </div>

            <div className="mt-4 flex gap-4">
                <Link
                    className="block"
                    href={route('accounts.show', account.id)}
                >
                    <Button>View</Button>
                </Link>

                <Link
                    className="block"
                    href={route('accounts.edit', account.id)}
                >
                    <Button>Edit</Button>
                </Link>

                <Link
                    className="block"
                    href={route('accounts.destroy', account.id)}
                    method="delete"
                >
                    <Button theme="danger">Delete</Button>
                </Link>
            </div>
        </Card>
    );
}
