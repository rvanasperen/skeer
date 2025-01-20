<?php

namespace App\Domain\Transaction\Calculators;

use App\Enums\GroupBy;
use App\Models\Account;
use App\Models\User;
use Carbon\Carbon;

class TransactionCalculator
{
    public function getTransactionsOverTime(
        User|Account $model,
        Carbon $startDate,
        Carbon $endDate,
        GroupBy $groupBy,
    ): array
    {
        return $model->transactions()
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
