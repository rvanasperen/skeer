export default interface CategoryData {
    id: number;
    name: string;
    spent: number;
    children?: CategoryData[];
    parent_id: number | null;
    transaction_count?: number;
}
