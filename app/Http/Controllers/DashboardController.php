<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\Category;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __invoke(Request $request): Response
    {
        $startDate = Carbon::parse($request->input('start_date', now()->subMonths(12)->startOfMonth()));
        $endDate = Carbon::parse($request->input('end_date', now()));
        $groupBy = $request->input('group_by', 'month'); // day, week, month, year

        $accounts = $this->getAccounts($request->user());
        $netWorthData = $this->getNetWorthData($request->user(), $startDate, $endDate, $groupBy);
        $transactionData = $this->getTransactionData($request->user(), $startDate, $endDate, $groupBy);

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
            'netWorthData' => $netWorthData,
            'transactionData' => $transactionData,
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'groupBy' => $groupBy,
        ]);
    }

    private function getAccounts(User $user): Collection
    {
        return $user->accounts()
            ->with(['currency',  'transactions'])
            ->orderBy('name')
            ->get();
    }

    private function getNetWorthData(User $user, Carbon $startDate, Carbon $endDate, string $groupBy): array
    {
        $startingBalanceCategory = Category::where('name', 'Starting Balance')->firstOrFail(); // todo: refactor

        $netWorthData = [
            'total' => [],
            'accounts' => [],
        ];

        foreach ($user->accounts as $account) {
            /** @var Account $account */
            $startingBalanceTransaction = $account->transactions()
                ->where([
                    'account_id' => $account->id,
                    'category_id' => $startingBalanceCategory->id,
                    'name' => 'Starting Balance',
                ])
                ->first();

            if ($startingBalanceTransaction === null) {
                continue;
            }

            $startingBalanceDate = $startingBalanceTransaction->transaction_date;

            $accountNetWorthData = [];

            $query = $account->transactions();

            switch ($groupBy) {
                case 'day':
                    $query->selectRaw('DATE(transaction_date) AS date');
                    break;
                case 'week':
                    $query->selectRaw('strftime(\'%Y-%W\', transaction_date) AS date');
                    break;
                case 'month':
                    $query->selectRaw('strftime(\'%Y-%m\', transaction_date) AS date');
                    break;
                case 'year':
                    $query->selectRaw('strftime(\'%Y\', transaction_date) AS date');
                    break;
            }

            $result = $query
                ->selectRaw(sprintf(
                    'SUM(CASE WHEN type = "%s" THEN amount ELSE -amount END) AS delta',
                    TransactionType::Income->value
                ))
                ->whereBetween('transaction_date', [
                    $startingBalanceDate,
                    $endDate->addDay(),
                ])
                ->groupBy('date')
                ->orderBy('date')
                ->get()
                ->map(fn ($row) => [
                    'date' => $row->date,
                    'delta' => round($row->delta, 2),
                ])
                ->each(function ($row) use (&$accountNetWorthData) {
                    $accountNetWorthData[] = $row;
                });

            $prev = 0;

            foreach ($accountNetWorthData as &$data) {
                $data['amount'] = $prev + $data['delta'];
                $prev = $data['amount'];
            }
            unset($data);

            $accountNetWorthData = collect($accountNetWorthData)
                ->filter(fn ($row) => $row['date'] >= $startDate->toDateString())
                ->map(fn ($row) => [
                    'date' => $row['date'],
                    'amount' => round($row['amount'], 2),
                ])
                ->values()
                ->toArray();

            $netWorthData['accounts'][$account->id] = $accountNetWorthData;
        }

        foreach ($netWorthData['accounts'] as $accountId => $accountData) {
            foreach ($accountData as $accountEntry) {
                $index = array_find_key($netWorthData['total'], fn ($totalEntry) => $totalEntry['date'] === $accountEntry['date']);

                if ($index === null) {
                    $netWorthData['total'][] = $accountEntry;
                } else {
                    $netWorthData['total'][$index]['amount'] += $accountEntry['amount'];
                }
            }
        }

        // todo: rounding

        return $netWorthData;
    }

    private function getTransactionData(User $user, Carbon $startDate, Carbon $endDate, string $groupBy): array
    {
        $query = $user->transactions();

        switch ($groupBy) {
            case 'day':
                $query->selectRaw('DATE(transaction_date) AS date');
                break;
            case 'week':
                $query->selectRaw('strftime(\'%Y-%W\', transaction_date) AS date');
                break;
            case 'month':
                $query->selectRaw('strftime(\'%Y-%m\', transaction_date) AS date');
                break;
            case 'year':
                $query->selectRaw('strftime(\'%Y\', transaction_date) AS date');
                break;
        }

        return $query
            ->selectRaw(sprintf(
                'SUM(CASE WHEN type = "%s" THEN amount ELSE -amount END) AS amount',
                TransactionType::Income->value
            ))
            ->whereBetween('transaction_date', [
                $startDate,
                $endDate->addDay(),
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
