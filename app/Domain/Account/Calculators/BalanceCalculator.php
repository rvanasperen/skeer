<?php

namespace App\Domain\Account\Calculators;

use App\Enums\GroupBy;
use App\Models\Account;
use Carbon\Carbon;

class BalanceCalculator
{
    public function getBalance(Account $account, ?Carbon $date = null): float
    {
        $date ??= now();

        return $account->transactions()
            ->selectNormalizedAmount()
            ->where('transaction_date', '<=', $date)
            ->pluck('amount')
            ->first(); // todo: ?? 0
    }

    public function getBalanceOverTime(
        Account $account,
        Carbon  $startDate,
        Carbon  $endDate,
        GroupBy $groupBy,
    ): array
    {
        return collect(
            $account->transactions()
                ->selectNormalizedAmount()
                ->selectGroupByDate($groupBy)
                ->where('transaction_date', '<=', $endDate)
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->map(fn($row) => [
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
            ->filter(fn($row) => $row['date'] >= $startDate->toDateString())
            ->values()
            ->toArray();
    }
}
