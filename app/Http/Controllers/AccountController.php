<?php

namespace App\Http\Controllers;

use App\Enums\AccountType;
use App\Models\Account;
use App\Models\Bank;
use App\Models\Currency;
use App\Rules\IBANRule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AccountController
{
    public function index(Request $request): Response
    {
        $accounts = $request->user()
            ->accounts()
            ->with(['bank', 'currency'])
            ->get();

        return Inertia::render('Account/Index', [
            'accounts' => $accounts,
        ]);
    }

    public function create(): Response
    {
        $banks = Bank::all();
        $currencies = Currency::all();

        return Inertia::render('Account/Create', [
            'banks' => $banks,
            'currencies' => $currencies,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'currency_id' => ['required', 'exists:currencies,id'],
            'name' => ['required', 'string'],
            'number' => ['required', 'string', 'unique:accounts', new IBANRule()],
            'type' => ['required', Rule::enum(AccountType::class)],
        ]);

        $request->user()
            ->accounts()
            ->create($validated);

        return to_route('accounts.index');
    }

    public function show(Request $request, Account $account)
    {
        dd('show', $account->toArray());
    }

    public function edit(Request $request, int $accountId): Response
    {
        $account = $request->user()
            ->accounts()
            ->with(['bank', 'currency'])
            ->findOrFail($accountId);
        $banks = Bank::all();
        $currencies = Currency::all();

        return Inertia::render('Account/Edit', [
            'account' => $account,
            'banks' => $banks,
            'currencies' => $currencies,
        ]);
    }

    public function update(Request $request, int $accountId): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'currency_id' => ['required', 'exists:currencies,id'],
            'name' => ['required', 'string'],
            'number' => ['required', 'string', 'unique:accounts,number,'.$accountId, new IBANRule()],
            'type' => ['required', Rule::enum(AccountType::class)],
        ]);

        $request->user()
            ->accounts()
            ->where('id', $accountId)
            ->update($validated);

        return to_route('accounts.index');
    }

    public function destroy(Request $request, int $accountId): RedirectResponse
    {
        $request->user()
            ->accounts()
            ->where('id', $accountId)
            ->delete();

        return back();
    }
}
