import { Account } from '@/Models';

export default interface Bank {
    id: number;
    name: string;
    bic: string;
    created_at: string;
    updated_at: string;

    accounts?: Account[];
}
