import { Account, Category, Transaction } from '@/Models';

export default interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;

    accounts?: Account[];
    categories?: Category[];
    transactions?: Transaction[];
}
