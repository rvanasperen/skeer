<?php

namespace App\Domain\Transaction\Transformers;

use App\Domain\Transaction\TransactionData;
use App\Domain\Transaction\Transformer;
use App\Enums\TransactionType;
use Carbon\Carbon;

class SNSBNL2ATransformer implements Transformer
{
    public function getHeaders(): ?array
    {
        return [
            'date',
            'account',
            'counter_party_iban',
            'counter_party_name',
            'unknown_1',
            'unknown_2',
            'unknown_3',
            'unknown_4',
            'unknown_5',
            'unknown_6',
            'amount',
            'currency',
            'unknown_7',
            'unknown_8',
            'unknown_9',
            'unknown_10',
            'unknown_11',
            'description',
            'unknown_12',
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

        if($amount > 0) {
            $type = TransactionType::Income;
        }

        return new TransactionData(
            type: $type,
            amount: $amount,
            name: $data['counter_party_name'],
            counterparty: $data['counter_party_iban'],
            description: $data['description'],
            transactionDate: Carbon::createFromFormat('d-m-Y', $data['date']),
        );
    }
}
