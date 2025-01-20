<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SetupController
{
    public function showForm(): Response
    {
        return Inertia::render('Setup');
    }

    public function processForm(Request $request)
    {
        dd($request->all());
    }
}
