<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController
{
    public function index(Request $request): Response
    {
        $transactions = $request->user()
            ->transactions()
            ->with(['account', 'category'])
            ->get();

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }
}
