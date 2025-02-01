<?php

namespace App\Domain\Transaction\Transformers;

use App\Domain\Transaction\TransactionData;
use App\Domain\Transaction\Transformer;
use App\Enums\TransactionType;
use Carbon\Carbon;
use LogicException;

class INGBNL2ATransformer implements Transformer
{
    public function hasHeaderRow(): bool
    {
        return true;
    }

    public function getHeaders(): ?array
    {
        return [
            'date',
            'counterparty_name',
            'account',
            'counterparty_account',
            'unused_5',
            'type',
            'amount',
            'unused_8',
            'description',
        ];
    }

    public function getAccountNumber(array $data): string
    {
        return $data['account'];
    }

    public function getTransactionData(array $data): TransactionData
    {
        $type = match ($data['type']) {
            'Af', 'Debit' => TransactionType::Expense,
            'Bij', 'Credit' => TransactionType::Income,
            default => throw new LogicException("Unsupported transaction type: {$data['type']}"),
        };

        return new TransactionData(
            type: $type,
            amount: (float) str_replace(',', '.', $data['amount']),
            name: $data['counterparty_name'],
            counterparty: $data['counterparty_account'],
            description: $data['description'],
            transactionDate: Carbon::createFromFormat('Ymd', $data['date']),
        );
    }
}
