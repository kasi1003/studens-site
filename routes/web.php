<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DisplayInternshipsController;
use App\Http\Controllers\AppliedInternshipsController;
use App\Http\Controllers\SubmittedInternshipsController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/dashboard', [DisplayInternshipsController::class, 'index'])
    ->middleware(['auth'])
    ->name('dashboard');

    
Route::post('/applied-internships', [AppliedInternshipsController::class, 'store'])
    ->middleware(['auth'])
    ->name('applied-internships.store');


Route::get('/submitted-internships', [SubmittedInternshipsController::class, 'index'])
    ->middleware(['auth'])
    ->name('submitted-internships');

    
require __DIR__ . '/auth.php';
