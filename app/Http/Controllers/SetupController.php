<?php

namespace App\Http\Controllers;

use App\Domain\Transaction\TransactionImporter;
use App\Models\Bank;
use App\Models\Currency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class SetupController
{
    public function showForm(): Response
    {
        $banks = Bank::all();
        $currencies = Currency::all();

        return Inertia::render('Setup', [
            'banks' => $banks,
            'currencies' => $currencies,
        ]);
    }

    public function processForm(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'currency_id' => ['required', 'exists:currencies,id'],
            'file' => ['required', File::types(['csv'])],
        ]);

        $bank = Bank::findOrFail($validated['bank_id']);
        $currency = Currency::findOrFail($validated['currency_id']);

        resolve(TransactionImporter::class)->import(
            $request->user(),
            $bank,
            $currency,
            $validated['file']->getRealPath(),
        );

        return to_route('dashboard');
    }
}
