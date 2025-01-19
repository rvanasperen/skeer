import { CategoryType } from '@/Enums';
import { Transaction, User } from '@/Models';

export default interface Category {
    id: number;
    user_id: number;
    parent_id?: number;
    name: string;
    type: CategoryType;

    transactions?: Transaction[];
    user?: User;
}
