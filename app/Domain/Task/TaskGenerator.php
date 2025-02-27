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

        $this->checkImportedAccountNames($tasks, $user);
        $this->checkMissingOrStaleOpeningBalance($tasks, $user);
        $this->checkStaleImportedTransactions($tasks, $user);
        $this->checkUncategorizedTransactions($tasks, $user);

        return $tasks;
    }

    private function checkImportedAccountNames(array &$tasks, User $user): void
    {
        $numImportedAccounts = $user->accounts()
            ->whereLike('name', '%(imported)')
            ->count();

        if ($numImportedAccounts > 0) {
            $tasks[] = new TaskData(
                'rename_imported_accounts',
                'Rename Imported Accounts',
                sprintf(
                    'You have %s imported account%s which need%s a better name.',
                    number_format($numImportedAccounts),
                    $numImportedAccounts === 1 ? '' : 's',
                    $numImportedAccounts === 1 ? 's' : ''
                ),
                route('accounts.index'),
            );
        }

    }

    private function checkMissingOrStaleOpeningBalance(array &$tasks, User $user): void
    {
        $openingBalanceService = resolve(OpeningBalanceService::class);

        foreach ($user->accounts as $account) {
            if (! $openingBalanceService->hasValidOpeningBalanceTransaction($account)) {
                $tasks[] = new TaskData(
                    "set_current_balance_{$account->id}",
                    'Set Current Balance',
                    sprintf(
                        'Update your current balance for account account "%s".',
                        $account->name
                    ),
                    route('accounts.edit', $account),
                );
            }
        }
    }

    private function checkStaleImportedTransactions(array &$tasks, User $user): void
    {
        $threshold = 2;

        $lastImportedTransaction = $user->transactions()
            ->orderBy('transactions.created_at', 'desc')
            ->first();

        if ($lastImportedTransaction === null) {
            return;
        }

        if ($lastImportedTransaction->transaction_date < now()->subDays($threshold)) {
            $tasks[] = new TaskData(
                'import_transactions',
                'Import Transactions',
                sprintf(
                    'Your imported transactions are stale. Import new ones starting from %s.',
                    $lastImportedTransaction->transaction_date->format('Y-m-d')
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
                'categorize_transactions',
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
