<?php

namespace App\Domain\Transaction;

use App\Enums\TransactionType;
use Carbon\Carbon;

class TransactionData
{
    public function __construct(
        public TransactionType $type,
        public float $amount,
        public string $name,
        public string $counterparty,
        public string $description,
        public Carbon $transactionDate,
    ) {
    }
}
