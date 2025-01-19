<?php

namespace App\Models;

use App\Enums\AccountType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    #region Eloquent Properties

    protected $appends = [
        'balance',
    ];

    #endregion

    #region Eloquent Relationships

    public function bank(): BelongsTo
    {
        return $this->belongsTo(Bank::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    #endregion

    protected function casts(): array
    {
        return [
            'type' => AccountType::class,
        ];
    }

    #region Accessors

    public function getBalanceAttribute(): ?float
    {
        if ($this->relationLoaded('transactions')) {
            return $this->transactions->sum('amount');
        }

        return null;
    }

    #endregion
}
