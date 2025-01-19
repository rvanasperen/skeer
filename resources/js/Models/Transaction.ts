import { TransactionType } from '@/Enums';
import { Account, Category, User } from '@/Models';

export default interface Transaction {
    id: number;
    user_id: number;
    account_id: number;
    category_id?: number;
    type: TransactionType;
    amount: number;
    name: string;
    counterparty: string;
    description: string;
    transaction_date: string;
    imported_at: string;
    import_hash: string;
    created_at: string;
    updated_at: string;

    account?: Account;
    category?: Category;
    user?: User;
}
