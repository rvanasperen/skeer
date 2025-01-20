<?php

namespace App\Domain\Account\Calculators;

use App\Enums\GroupBy;
use App\Models\Account;
use Carbon\Carbon;

class TransactionCalculator
{
    public function getTransactionsOverTime(
        Account $account,
        Carbon $startDate,
        Carbon $endDate,
        GroupBy $groupBy,
    ): array
    {
        return $account->transactions()
            ->selectNormalizedAmount()
            ->selectGroupByDate($groupBy)
            ->whereBetween('transaction_date', [
                $startDate,
                $endDate,
            ])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => [
                'date' => $row->date,
                'amount' => round($row->amount, 2),
            ])
            ->toArray();
    }
}
