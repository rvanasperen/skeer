<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;

abstract class Model extends EloquentModel
{
    // region Eloquent Properties

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // endregion
}
