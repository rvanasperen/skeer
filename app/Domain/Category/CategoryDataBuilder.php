<?php

namespace App\Domain\Category;

use App\Enums\TransactionType;
use App\Models\Category;
use App\Models\User;

class CategoryDataBuilder
{
    public function buildCategoryData(User $user): array
    {
        $data = $user->categories()
            ->leftJoin('transactions', 'categories.id', '=', 'transactions.category_id')
            ->select([
                'categories.id',
                'categories.id AS category_id',
                'categories.name AS category_name',
                'categories.parent_id AS category_parent_id',
            ])
            ->selectRaw("COALESCE(SUM(CASE WHEN transactions.type = ? THEN amount WHEN transactions.type = ? THEN -amount WHEN transactions.type = ? THEN 0 END), 0) AS spent",
                [
                    TransactionType::Income->value,
                    TransactionType::Expense->value,
                    TransactionType::Transfer->value,
                ])
            ->groupBy([
                'categories.id',
                'categories.name',
                'categories.parent_id',
            ])
            ->orderBy('categories.parent_id')
            ->get();

        return $this->buildNestedCategoryData($data);
    }

    private function buildNestedCategoryData($data): array
    {
        $nestedData = [];

        foreach ($data as $category) {
            if ($category->category_parent_id === null) {
                $nestedData[] = $this->buildCategory($category, $data);

                // Update parents spent amount
                $nestedData[count($nestedData) - 1]['spent'] = array_reduce(
                    $nestedData[count($nestedData) - 1]['children'],
                    fn ($carry, $item) => round($carry + $item['spent'], 2), 0
                );
            }
        }

        return $nestedData;
    }

    private function buildCategory(Category $category, $data): array
    {
        $categoryData = [
            'id' => $category->category_id,
            'name' => $category->category_name,
            'spent' => round($category->spent, 2),
            'children' => [],
            'transaction_count' => $category->transactions()->count(),
        ];

        foreach ($data as $child) {
            if ($child->category_parent_id === $category->category_id) {
                $categoryData['children'][] = $this->buildCategory($child, $data);
            }
        }

        return $categoryData;
    }
}
