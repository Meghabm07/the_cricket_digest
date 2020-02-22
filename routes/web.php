<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    if (auth()->check()) {
        return redirect('/dashboard');
    }
    return view('auth.login');
});

Auth::routes();

/**
 *  User Route Group
 *  Namespace User: Controllers Within The "App\Http\Controllers\User" Namespace
 *  Middleware Auth : Only Authenticated Users can access this Route group
 */

Route::middleware(['auth'])->group(function () {

    Route::namespace('Dashboard')->prefix('dashboard')->name('dashboard.')->group(function () {

        Route::get('/', 'DashboardController@index')->name('index');
    });

    Route::namespace('Category')->prefix('category')->name('category.')->group(function () {

        Route::get('/', 'CategoryController@index')->name('index');

        Route::post('/', 'CategoryController@store')->name('store');

        Route::get('/list', 'CategoryController@list')->name('list');

        Route::get('/{category}', 'CategoryController@edit')->name('edit');

        Route::post('/{category}', 'CategoryController@update')->name('update');

        Route::delete('/{category}', 'CategoryController@destroy')->name('delete');
    });

    Route::namespace('Product')->prefix('product')->name('product.')->group(function () {

        Route::get('/', 'ProductController@index')->name('index');

        Route::get('/create', 'ProductController@create')->name('create');

        Route::post('/', 'ProductController@store')->name('store');

        Route::get('/{product}', 'ProductController@edit')->name('edit');

        Route::put('/{product}', 'ProductController@update')->name('update');

        Route::delete('/', 'ProductController@destroy')->name('delete');
    });
});