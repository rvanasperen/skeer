<?php

namespace Database\Factories;

use App\Enums\AccountType;
use App\Models\Bank;
use App\Models\Currency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'number' => fake()->iban(),
            'type' => fake()->randomElement(AccountType::cases()),
            'bank_id' => Bank::inRandomOrder()->first()->id,
            'currency_id' => Currency::inRandomOrder()->first()->id,
        ];
    }
}
