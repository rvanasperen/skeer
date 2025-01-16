<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController
{
    public function __invoke()
    {
        return Inertia::render('Dashboard');
    }
}
