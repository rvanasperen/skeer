<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\Transaction;
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
        $transactionData = $this->getTransactionData($request->user(), $startDate, $endDate, $groupBy);

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
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
            ->map(fn ($transaction) => [
                'date' => $transaction->date,
                'amount' => round($transaction->amount, 2),
            ])
            ->toArray();
    }
}
