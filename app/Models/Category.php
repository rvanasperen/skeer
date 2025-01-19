<?php

namespace App\Models;

use App\Enums\CategoryType;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    #region Eloquent Properties

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    #endregion

    #region Eloquent Relationships

    #endregion

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }
}
