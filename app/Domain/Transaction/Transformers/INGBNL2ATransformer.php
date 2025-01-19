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
        return $data['Rekening'];
    }

    public function getTransactionData(array $data): TransactionData
    {
        $type = match($data['Af Bij']) {
            'Af' => TransactionType::Expense,
            'Bij' => TransactionType::Income,
            default => throw new LogicException("Unsupported transaction type: {$data['Af Bij']}"),
        };

        $amount = (float) str_replace(',', '.', $data['Bedrag (EUR)']);

        return new TransactionData(
            type: $type,
            amount: $amount,
            name: $data['Naam / Omschrijving'],
            counterparty: $data['Tegenrekening'],
            description: $data['Mededelingen'],
            transactionDate: Carbon::createFromFormat('Ymd', $data['Datum']),
        );
    }
}
