<?php

namespace App\Domain\Transaction\Calculators;

use App\Enums\GroupBy;
use App\Models\Account;
use App\Models\User;
use Carbon\Carbon;

class BalanceCalculator
{
    public function getBalance(User|Account $model, ?Carbon $date = null): float
    {
        $date ??= now();

        return $model->transactions()
            ->selectNormalizedAmount()
            ->where('transaction_date', '<=', $date)
            ->pluck('amount')
            ->first(); // todo: ?? 0
    }

    public function getBalanceOverTime(
        User|Account $model,
        Carbon       $startDate,
        Carbon       $endDate,
        GroupBy      $groupBy,
    ): array {
        return collect(
            $model->transactions()
                ->selectNormalizedAmount()
                ->selectGroupByDate($groupBy)
                ->where('transaction_date', '<=', $endDate)
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->map(fn ($row) => [
                    'date' => $row->date,
                    'delta' => round($row->amount, 2),
                ])
                ->reduce(function ($carry, $row) {
                    $carry[] = [
                        'date' => $row['date'],
                        'delta' => $row['delta'],
                        'balance' => $carry
                            ? end($carry)['balance'] + $row['delta']
                            : $row['delta'],
                    ];

                    return $carry;
                }, [])
        )
            ->filter(fn ($row) => $row['date'] >= $startDate->toDateString())
            ->values()
            ->toArray();
    }
}
