import { Bank, Currency } from '@/Models';

export default interface Account {
    id: number;
    bank_id: number;
    currency_id: number;
    user_id: number;
    name: string;
    number: string;
    type: string;

    bank?: Bank;
    currency?: Currency;
}
