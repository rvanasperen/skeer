<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __invoke(Request $request): Response
    {
        $accounts = $request->user()
            ->accounts()
            ->with(['currency',  'transactions'])
            ->orderBy('name')
            ->get();

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
        ]);
    }
}
