import { Account } from '@/Models/index';

export default interface Currency {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;

    accounts?: Account[];
}
