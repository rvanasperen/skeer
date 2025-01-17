<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class IndexController
{
    public function __invoke()
    {
        return Inertia::render('Index');
    }
}
