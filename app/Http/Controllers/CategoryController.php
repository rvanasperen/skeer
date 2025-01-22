<?php

namespace App\Http\Controllers;

use App\Domain\Category\CategoryDataBuilder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController
{
    public function __construct(
        private readonly CategoryDataBuilder $builder,
    ) {
    }

    public function index(Request $request): Response
    {
        $categories = $this->builder->buildCategoryData($request->user()); // todo: date range

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }
}
