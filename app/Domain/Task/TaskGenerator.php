<?php

namespace App\Domain\Task;

use App\Domain\Transaction\OpeningBalanceService;
use App\Models\User;

class TaskGenerator
{
    /**
     * @return array<TaskData>
     */
    public function generateTasks(User $user): array
    {
        $tasks = [];

        $this->checkMissingOrStaleOpeningBalance($tasks, $user);
        $this->checkStaleImport($tasks, $user);
        $this->checkUncategorizedTransactions($tasks, $user);

        return $tasks;
    }

    private function checkMissingOrStaleOpeningBalance(array &$tasks, User $user): void
    {
        $openingBalanceService = resolve(OpeningBalanceService::class);

        foreach ($user->accounts as $account) {
            if (! $openingBalanceService->hasValidOpeningBalanceTransaction($account)) {
                $tasks[] = new TaskData(
                    'Set Current Balance',
                    sprintf(
                        'Update your current balance for account account "%s".',
                        $account->name
                    ),
                    route('accounts.edit', $account),
                );
            }
        }
        // todo
    }

    private function checkStaleImport(array &$tasks, User $user): void
    {
        $threshold = 2;

        $lastImportedTransactionDate = $user->transactions()
            ->orderBy('transaction_date', 'desc')
            ->first()
            ->transaction_date;

        if ($lastImportedTransactionDate < now()->subDays($threshold)) {
            $tasks[] = new TaskData(
                'Import Transactions',
                sprintf(
                    'Your imported transactions are out of date. Import new ones starting from %s.',
                    $lastImportedTransactionDate->format('Y-m-d')
                ),
                route('transactions.import'),
            );
        }
    }

    private function checkUncategorizedTransactions(array &$tasks, User $user): void
    {
        $numTransactionsWithCategory = $user->transactions()
            ->whereNull('category_id')
            ->count();

        if ($numTransactionsWithCategory > 0) {
            $tasks[] = new TaskData(
                'Categorize Transactions',
                sprintf(
                    'You have %s transactions without a category.',
                    number_format($numTransactionsWithCategory)
                ),
                route('transactions.index'),
            );
        }
    }
}
