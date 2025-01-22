<?php

namespace App\Domain\Transaction\Transformers;

use App\Domain\Transaction\TransactionData;
use App\Domain\Transaction\Transformer;
use App\Enums\TransactionType;
use Carbon\Carbon;

class SNSBNL2ATransformer implements Transformer
{
    public function hasHeaderRow(): bool
    {
        return false;
    }

    public function getHeaders(): ?array
    {
        return [
            'date',
            'account',
            'counterparty_iban',
            'counterparty_name',
            'unused_5',
            'unused_6',
            'unused_7',
            'unused_8',
            'unused_9',
            'unused_10',
            'amount',
            'currency',
            'unused_13',
            'unused_14',
            'unused_15',
            'unused_16',
            'unused_17',
            'description',
            'unused_19',
            'assigned_category'
        ];
    }

    public function getAccountNumber(array $data): string
    {
        return $data['account'];
    }

    public function getTransactionData(array $data): TransactionData
    {
        $type = TransactionType::Expense;
        $amount = (float) $data['amount'];

        if ($amount > 0) {
            $type = TransactionType::Income;
        }

        $amount = abs($amount);

        return new TransactionData(
            type: $type,
            amount: $amount,
            name: $data['counterparty_name'],
            counterparty: $data['counterparty_iban'],
            description: $data['description'],
            transactionDate: Carbon::createFromFormat('d-m-Y', $data['date']),
        );
    }
}
