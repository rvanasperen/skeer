<?php

namespace Database\Seeders;

use App\Enums\CategoryType;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        $user = $this->createUser();
        $this->createDefaultCategories($user);
    }

    private function createUser(): User
    {
        return User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }

    private function createDefaultCategories(User $user): void
    {
        $expense = [
            'Usual Expenses' => [
                'Clothing',
                'Entertainment',
                'General',
                'Gift',
                'Groceries',
                'Medical',
                'Restaurants / Takeout',
                'Savings',
                'Travel',
            ],
            'Bills' => [
                'Cell',
                'Internet',
                'Electricity',
                'Gas',
                'Insurance',
                'Mortgage / Rent',
                'Water',
            ],
        ];

        $income = [
            'Income' => [
                'Income',
                'Misc',
                'Starting Balance', // todo: Opening Balance, magic string
            ],
        ];

        foreach ($expense as $category => $subcategories) {
            $this->createCategory($user, $category, $subcategories, CategoryType::Expense);
        }

        foreach ($income as $category => $subcategories) {
            $this->createCategory($user, $category, $subcategories, CategoryType::Income);
        }
    }

    private function createCategory(User $user, string $category, array $subcategories, CategoryType $type): void
    {
        $category = Category::create([
            'user_id' => $user->id,
            'name' => $category,
            'type' => $type,
        ]);

        foreach ($subcategories as $subcategory) {
            Category::create([
                'parent_id' => $category->id,
                'user_id' => $user->id,
                'name' => $subcategory,
                'type' => $type,
            ]);
        }
    }
}
