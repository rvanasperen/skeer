import { Bank, Currency } from '@/Models';

export default interface Account {
    id: number;
    name: string;
    number: number;

    bank?: Bank;
    currency?: Currency;
}
