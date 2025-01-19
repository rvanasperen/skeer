import { AccountType } from '@/Enums';
import { Bank, Currency } from '@/Models';

export default interface Account {
    id: number;
    user_id: number;
    bank_id: number;
    currency_id: number;
    name: string;
    number: string;
    type: AccountType;

    bank?: Bank;
    currency?: Currency;

    balance: number;
}
