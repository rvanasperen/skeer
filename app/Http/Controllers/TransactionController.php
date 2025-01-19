<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
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

    public function showImportForm(Request $request): Response
    {
        $banks = Bank::all();

        return Inertia::render('Transaction/Import', [
            'banks' => $banks,
        ]);
    }

    public function processImport(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'file' => ['required', File::types(['csv'])],
            'balance' => ['required', 'numeric'],
        ]);

        dd($request->all(), $request->file('file'));

        return to_route('transactions.index');
    }
}
