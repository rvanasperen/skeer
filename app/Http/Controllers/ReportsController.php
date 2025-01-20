<?php

namespace App\Http\Controllers;

use App\Domain\Transaction\Calculators\BalanceCalculator;
use App\Domain\Transaction\Calculators\TransactionCalculator;
use App\Enums\GroupBy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportsController
{
    public function __construct(
        private readonly BalanceCalculator $balanceCalculator,
        private readonly TransactionCalculator $transactionCalculator,
    ) {
    }

    public function __invoke(Request $request): Response
    {
        $startDate = Carbon::parse(
            $request->input(
                'start_date',
                now()->subMonths(12)->startOfMonth()
            )
        );
        $endDate = Carbon::parse(
            $request->input(
                'end_date',
                now()->subMonth()->endOfMonth()
            )
        );
        $groupBy = GroupBy::from(
            $request->input('group_by', 'month')
        );

        $user = $request->user();

        $balanceOverTimeData = $this->balanceCalculator->getBalanceOverTime(
            $user,
            $startDate,
            $endDate,
            $groupBy,
        );

        $transactionsOverTimeData = $this->transactionCalculator->getTransactionsOverTime(
            $user,
            $startDate,
            $endDate,
            $groupBy
        );

        return Inertia::render('Reports', [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'groupBy' => $groupBy,
            'balanceOverTimeData' => $balanceOverTimeData,
            'transactionsOverTimeData' => $transactionsOverTimeData,
        ]);
    }
}
