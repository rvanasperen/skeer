export default interface CategoryData {
    id: number;
    name: string;
    spent: number;
    children?: CategoryData[];
}
