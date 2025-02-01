<?php

namespace Database\Factories;

use App\Enums\TransactionType;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isIncome = fake()->boolean(10);
        $amount = $isIncome ? fake()->randomFloat(2, 1000, 3000) : fake()->randomFloat(2, 1, 300);

        return [
            'category_id' => Category::inRandomOrder()->first()->id,
            'type' => ($isIncome ? TransactionType::Income : TransactionType::Expense),
            'amount' => $amount,
            'name' => fake()->company(),
            'counterparty' => fake()->iban(),
            'description' => fake()->sentence(),
            'transaction_date' => fake()->dateTimeBetween('-1 year', '-2 days'),
            'import_hash' => fake()->sha1(),
        ];
    }
}
