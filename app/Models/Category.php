<?php

namespace App\Models;

use App\Enums\CategoryType;

class Category extends Model
{
    #region Eloquent Relationships

    #endregion

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }
}
