<?php

namespace App\Models;

use App\Enums\GroupBy;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;
use LogicException;

class Transaction extends Model
{
    #region Eloquent Relationships

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    #endregion

    #region Eloquent Scopes

    public function scopeSelectNormalizedAmount(Builder $query, string $alias = 'amount'): void
    {
        $query->selectRaw("SUM(CASE WHEN type = ? THEN amount WHEN type = ? THEN -amount WHEN type = ? THEN 0 END) AS $alias", [
            TransactionType::Income->value,
            TransactionType::Expense->value,
            TransactionType::Transfer->value,
        ]);
    }

    public function scopeSelectGroupByDate(Builder $query, GroupBy $groupBy, string $alias = 'date'): void
    {
        $dbDriver = DB::getConfig('driver');

        switch ($dbDriver) {
            case 'sqlite':
                switch ($groupBy) {
                    case GroupBy::Day:
                        $query->selectRaw("DATE(transaction_date) AS $alias");
                        break;
                    case GroupBy::Week:
                        $query->selectRaw("strftime('%Y-%W', transaction_date) AS $alias");
                        break;
                    case GroupBy::Month:
                        $query->selectRaw("strftime('%Y-%m', transaction_date) AS $alias");
                        break;
                    case GroupBy::Year:
                        $query->selectRaw("strftime('%Y', transaction_date) AS $alias");
                        break;
                }
                break;

            default:
                throw new LogicException("selectGroupByDate() Transaction scope not supported for driver: $dbDriver");
        }
    }

    #endregion

    protected function casts(): array
    {
        return [
            'type' => TransactionType::class,
            'transaction_date' => 'date',
            'imported_at' => 'datetime',
        ];
    }
}
