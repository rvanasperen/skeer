<?php

namespace Database\Seeders;

use App\Models\Bank;
use App\Models\Currency;
use Illuminate\Database\Seeder;

class CoreDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createBanks();
        $this->createCurrencies();
    }

    private function createBanks(): void
    {
        $banks = [
            ['bic' => 'INGBNL2A', 'name' => 'ING Bank'],
            ['bic' => 'SNSBNL2A', 'name' => 'SNS Bank'],
        ];

        foreach ($banks as $data) {
            Bank::create($data);
        }
    }

    private function createCurrencies(): void
    {
        $currencies = [
            ['code' => 'EUR', 'name' => 'Euro'],
            ['code' => 'USD', 'name' => 'US Dollar'],
        ];

        foreach ($currencies as $data) {
            Currency::create($data);
        }
    }
}
