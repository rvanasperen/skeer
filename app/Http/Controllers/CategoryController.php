<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController
{
    public function index(Request $request): Response
    {
        $categories = $request->user()->categories;

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }
}
