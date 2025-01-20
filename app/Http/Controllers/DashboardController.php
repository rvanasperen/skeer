<?php

namespace App\Http\Controllers;

use App\Domain\Transaction\Calculators\BalanceCalculator;
use App\Enums\GroupBy;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __construct(
        private readonly BalanceCalculator $balanceCalculator,
    ) {
    }

    public function __invoke(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        $accounts = $user->accounts()
            ->with(['currency'])
            ->orderBy('name')
            ->get();

        if ($accounts->isEmpty()) {
            return to_route('setup');
        }

        $balanceOverTimeData = $this->balanceCalculator->getBalanceOverTime(
            $user,
            now()->subDays(14)->startOfDay(),
            now(),
            GroupBy::Day,
        );

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
            'balanceOverTimeData' => $balanceOverTimeData,
        ]);
    }
}
