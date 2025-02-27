<?php

namespace App\Domain\Transaction;

use App\Enums\TransactionType;
use Carbon\Carbon;

final readonly class TransactionData
{
    public function __construct(
        public TransactionType $type,
        public float $amount,
        public string $name,
        public string $counterparty,
        public string $description,
        public Carbon $transactionDate,
    ) {}
}
