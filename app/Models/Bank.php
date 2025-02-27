<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Bank extends Model
{
    // region Eloquent Relationships

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    // endregion
}
