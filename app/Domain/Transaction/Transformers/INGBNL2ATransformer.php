<?php

namespace App\Domain\Transaction\Transformers;

use App\Domain\Transaction\TransactionData;
use App\Domain\Transaction\Transformer;
use App\Enums\TransactionType;
use Carbon\Carbon;
use LogicException;

class INGBNL2ATransformer implements Transformer
{
    public function getAccountNumber(array $data): string
    {
        return $data['Rekening'] ?? $data['Account'];
    }

    public function getTransactionData(array $data): TransactionData
    {
        $typeField = $data['Af Bij'] ?? $data['Debit/credit'];

        $type = match ($typeField) {
            'Af', 'Debit' => TransactionType::Expense,
            'Bij', 'Credit' => TransactionType::Income,
            default => throw new LogicException("Unsupported transaction type: {$typeField}"),
        };

        // todo: currency code
        $amount = (float) str_replace(',', '.', $data['Bedrag (EUR)'] ?? $data['Amount (EUR)']);

        return new TransactionData(
            type: $type,
            amount: $amount,
            name: $data['Naam / Omschrijving'] ?? $data['Name / Description'],
            counterparty: $data['Tegenrekening'] ?? $data['Counterparty'],
            description: $data['Mededelingen'] ?? $data['Notifications'],
            transactionDate: Carbon::createFromFormat('Ymd', $data['Datum'] ?? $data['Date']),
        );
    }
}
