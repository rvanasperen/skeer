<?php

namespace Database\Seeders;

use App\Enums\AccountType;
use App\Enums\CategoryType;
use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        $user = $this->createUser();
        $this->createDefaultCategories($user);
        $account = $this->createBankAccount($user);
        $this->createTransactions($account, $user);
    }

    private function createBankAccount(User $user)
    {
        return Account::factory()->create([
            'user_id' => $user->id,
            'type' => AccountType::Checking
        ]);
    }

    private function createTransactions(Account $account, User $user)
    {
        /** @var Category $salaryCategory */
        $salaryCategory = Category::firstWhere('name', 'Salary');

        Transaction::factory()
            ->count(10)
            ->create([
                'category_id' => $salaryCategory->id,
                'user_id' => $user->id,
                'account_id' => $account->id,
            ]);

        $outgoing = Category::whereIn('name', ['Bills', 'Usual Expenses'])->get();
        $categories = Category::whereIn('parent_id', $outgoing->pluck('id'))->get();

        Transaction::factory()
            ->count(100)
            ->afterMaking(function (Transaction $transaction) use ($categories) {
                $transaction->category_id = $categories->random()->id;
            })
            ->create([
                'type' => TransactionType::Expense,
                'user_id' => $user->id,
                'account_id' => $account->id,
            ]);
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
                'Salary',
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
        ]);

        foreach ($subcategories as $subcategory) {
            Category::create([
                'parent_id' => $category->id,
                'user_id' => $user->id,
                'name' => $subcategory,
            ]);
        }
    }
}
