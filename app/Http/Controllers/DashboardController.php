<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
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

        $transactionData = $request->user()
            ->transactions()
            ->selectRaw('DATE(transaction_date) AS date, SUM(CASE WHEN type = "Income" THEN amount ELSE -amount END) AS total_amount')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($transaction) => [
                'date' => $transaction->date,
                'total_amount' => round($transaction->total_amount, 2),
            ])
            ->toArray();

        return Inertia::render('Dashboard', [
            'accounts' => $accounts,
            'transactionData' => $transactionData,
        ]);
    }
}
