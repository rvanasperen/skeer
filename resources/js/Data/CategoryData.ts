export default interface CategoryData {
    id: number;
    parent_id: number | null;
    name: string;
    spent: number;
    children?: CategoryData[];
    transaction_count?: number;
}
