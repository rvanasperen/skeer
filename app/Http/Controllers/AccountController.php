<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController
{
    public function index(Request $request): Response
    {
        $accounts = $request->user()->accounts;

        return Inertia::render('Account/Index', [
            'accounts' => $accounts,
        ]);
    }
}
