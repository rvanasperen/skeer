<?php

namespace App\Domain\Transaction;

use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use LogicException;

class OpeningBalanceService
{
    public const string OPENING_BALANCE_CATEGORY_NAME = 'Opening Balance';
    public const string OPENING_BALANCE_TRANSACTION_NAME = 'Opening Balance';

    public function hasValidOpeningBalanceTransaction(Account $account): bool
    {
        $openingBalanceCategory = $this->getOpeningBalanceCategory($account->user);

        $firstTransaction = $account->transactions()
            ->orderBy('transaction_date')
            ->first();

        return ! ($firstTransaction === null || (
                $firstTransaction->category_id !== $openingBalanceCategory->id &&
                $firstTransaction->name !== static::OPENING_BALANCE_TRANSACTION_NAME
            ));
    }

    public function updateOpeningBalance(Account $account, float $currentBalance): void
    {
        $earliestNonOpeningBalanceTransaction = $this->getEarliestNonOpeningBalanceTransaction($account);

        if ($earliestNonOpeningBalanceTransaction === null) {
            return;
        }

        $openingBalanceCategory = $this->getOpeningBalanceCategory($account->user);
        $openingBalanceDate = $earliestNonOpeningBalanceTransaction->transaction_date->subDay();

        $historicalBalance = $account->transactions()
            ->selectNormalizedAmount()
            ->where(function (Builder $query) use ($openingBalanceCategory) {
                $query->whereNull('category_id')
                    ->orWhereNot('category_id', $openingBalanceCategory->id);
            })
            ->pluck('amount')
            ->first() ?? 0;

        $openingBalance = $currentBalance - $historicalBalance;

        $account->transactions()->updateOrCreate([
            'category_id' => $openingBalanceCategory->id,
            'user_id' => $account->user_id,
            'name' => static::OPENING_BALANCE_TRANSACTION_NAME,
            'type' => TransactionType::Income,
        ], [
            'amount' => $openingBalance,
            'transaction_date' => $openingBalanceDate,
        ]);
    }

    private function getEarliestNonOpeningBalanceTransaction(Account $account): ?Transaction
    {
        return $account->transactions()
            ->whereNot('name', static::OPENING_BALANCE_TRANSACTION_NAME)
            ->orderBy('transaction_date')
            ->first();
    }

    private function getOpeningBalanceCategory(User $user): Category
    {
        $category = $user->categories()
            ->where('name', static::OPENING_BALANCE_CATEGORY_NAME)
            ->first();

        if ($category === null) {
            throw new LogicException('Opening balance category not found.');
        }

        return $category;
    }
}
