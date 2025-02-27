<?php

use App\Http\Controllers;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\IndexController::class)
    ->name('index');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', Controllers\DashboardController::class)
        ->name('dashboard');

    Route::get('reports', Controllers\ReportsController::class)
        ->name('reports');

    Route::resource('accounts', Controllers\AccountController::class);

    Route::resource('categories', Controllers\CategoryController::class);

    Route::get('transactions/import', [Controllers\TransactionController::class, 'showImportForm'])
        ->name('transactions.import');
    Route::post('transactions/import', [Controllers\TransactionController::class, 'processImport']);
    Route::resource('transactions', Controllers\TransactionController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
