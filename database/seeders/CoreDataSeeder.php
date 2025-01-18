<?php

namespace Database\Seeders;

use App\Models\Bank;
use Illuminate\Database\Seeder;

class CoreDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createBanks();
    }

    private function createBanks(): void
    {
        $banks = [
            ['bic' => 'INGBNL2A', 'name' => 'ING Bank'],
        ];

        foreach ($banks as $data) {
            Bank::create($data);
        }
    }
}
