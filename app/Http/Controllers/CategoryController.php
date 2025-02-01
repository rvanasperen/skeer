<?php

namespace App\Http\Controllers;

use App\Domain\Category\CategoryDataBuilder;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $categories = $this->builder->buildCategoryData($request->user());

        return Inertia::render('Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        /** @var User $user */
        $user = auth()->user();
        $categories = $this->builder->buildCategoryData($user);

        return Inertia::render('Category/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:categories,id'],
        ]);

        Category::create($validated + [
            'user_id' => auth()->id(),
        ]);

        return to_route('categories.index');
    }

    public function edit(Category $category): Response
    {
        /** @var User $user */
        $user = auth()->user();
        $categories = $this->builder->buildCategoryData($user);

        return Inertia::render('Category/Edit', [
            'categories' => $categories,
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:categories,id'],
        ]);

        $category->update($validated);

        return to_route('categories.index');
    }

    public function destroy(Request $request, Category $category): RedirectResponse
    {
        $passed = DB::transaction(function () use ($category) {
            $category
                ->transactions()
                ->update(['category_id' => null]);

            $category->delete();

            return true;
        });

        return to_route('categories.index', [
            'success' => (bool) $passed,
        ]);
    }
}
