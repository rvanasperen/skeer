<?php

namespace App\Domain\Transaction;

interface Transformer
{
    public function getHeaders(): ?array;

    public function getAccountNumber(array $data): string;

    public function getTransactionData(array $data): TransactionData;
}
