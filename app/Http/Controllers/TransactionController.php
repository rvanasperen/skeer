<?php

namespace App\Http\Controllers;

use App\Domain\Transaction\TransactionImporter;
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
            ->orderByDesc('transaction_date')
            ->get();

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function showImportForm(): Response
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
        ]);

        resolve(TransactionImporter::class)
            ->import(
                $request->user(),
                Bank::findOrFail($validated['bank_id']),
                $validated['file']->getRealPath(),
            );

        return to_route('transactions.index');
    }
}
