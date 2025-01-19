<?php

namespace App\Domain\Account\Calculators;

use App\Enums\GroupBy;
use App\Enums\TransactionType;
use App\Models\Account;
use App\Support\QueryHelper;
use Carbon\Carbon;

class BalanceCalculator
{
    public function getBalance(Account $account, ?Carbon $date = null): float
    {
        $date ??= now();

        return $account->transactions()
            ->selectRaw('SUM(CASE WHEN type = ? THEN amount ELSE -amount END) as balance', [TransactionType::Income->value])
            ->where('transaction_date', '<=', $date)
            ->pluck('balance')
            ->first();
    }

    public function getBalanceOverTime(
        Account $account,
        Carbon $startDate,
        Carbon $endDate,
        GroupBy $groupBy,
    ): array
    {
        $query = $account->transactions();

        resolve(QueryHelper::class)->addGroupBy($query, $groupBy);

        $results = $query->selectRaw('SUM(CASE WHEN type = ? THEN amount ELSE -amount END) as delta', [TransactionType::Income->value])
            ->where('transaction_date', '<=', $endDate)
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => [
                'date' => $row->date,
                'delta' => round($row->delta, 2),
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
            }, []);

        return collect($results)
            ->filter(fn ($row) => $row['date'] >= $startDate->toDateString())
            ->values()
            ->toArray();
    }
}
