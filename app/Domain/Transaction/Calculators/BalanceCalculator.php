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

        static $cache;
        $cache ??= [];

        $cacheKey = $model->getTable().$model->id.$date->format('Y-m-d');

        if (! isset($cache[$cacheKey])) {
            $cache[$cacheKey] = $model->transactions()
                ->selectNormalizedAmount()
                ->where('transaction_date', '<=', $date)
                ->pluck('amount')
                ->first() ?? 0;
        }

        return $cache[$cacheKey];
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
                ->where('transaction_date', '<=', $endDate->endOfDay())
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
            ->filter(fn ($row) => $startDate->lte($row['date']))
            ->values()
            ->toArray();
    }
}
