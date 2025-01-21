<?php

namespace App\Http\Controllers;

use App\Domain\Category\CategoryDataBuilder;
use App\Domain\Task\TaskGenerator;
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
        private readonly CategoryDataBuilder $categoryDataBuilder,
        private readonly TaskGenerator $taskGenerator,
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

        $categoryData = $this->categoryDataBuilder->buildCategoryData($user); // todo: date range

        $tasks = $this->taskGenerator->generateTasks($user);

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
            'balanceOverTimeData' => $balanceOverTimeData,
            'categoryData' => $categoryData,
            'tasks' => $tasks,
        ]);
    }
}
