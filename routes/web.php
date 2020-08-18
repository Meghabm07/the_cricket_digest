<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::get('/login', function () {
    if (auth()->check()) {
        return redirect('/admin/dashboard');
    }
    return view('auth.login');
});

Auth::routes();

/**
 *  Admin Route Group
 *  Middleware Auth : Only Authenticated Users can access this Route group
 */

Route::namespace('Admin')->middleware(['auth'])->name('admin.')->prefix('admin')->group(function () {

    Route::namespace('Dashboard')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', 'DashboardController@index')->name('index');

        Route::get('/total-count', 'DashboardController@totalCounts')->name('totalCounts');
    });

    Route::namespace('Category')->prefix('category')->name('category.')->group(function () {

        Route::get('/', 'CategoryController@index')->name('index');

        Route::post('/', 'CategoryController@store')->name('store');

        Route::get('/list', 'CategoryController@list')->name('list');

        Route::get('/{category}', 'CategoryController@edit')->name('edit');

        Route::post('/{category}', 'CategoryController@update')->name('update');

        Route::delete('/{category}', 'CategoryController@destroy')->name('delete');
    });

    Route::namespace('Blog')->prefix('blog')->name('blog.')->group(function () {

        Route::get('/', 'BlogController@index')->name('index');

        Route::get('/category/list', 'BlogController@getCategoryList')->name('getCategoryList');

        Route::get('/list', 'BlogController@list')->name('list');

        Route::post('/', 'BlogController@store')->name('store');

        Route::get('/{blog}', 'BlogController@edit')->name('edit');

        Route::get('/{blog}/show', 'BlogController@show')->name('show');

        Route::post('/{blog}', 'BlogController@update')->name('update');

        Route::delete('/{blog}', 'BlogController@destroy')->name('delete');

        Route::post('/{blog}/trending', 'BlogController@updateTrending')->name('updateTrending');
    });

    Route::namespace('Video')->prefix('video')->name('video.')->group(function () {

        Route::get('/', 'VideoController@index')->name('index');

        Route::get('/list', 'VideoController@list')->name('list');

        Route::post('/', 'VideoController@store')->name('store');

        Route::get('/{video}', 'VideoController@edit')->name('edit');

        Route::post('/{video}', 'VideoController@update')->name('update');

        Route::delete('/{video}', 'VideoController@destroy')->name('delete');

        Route::post('/{video}/trending', 'VideoController@updateTrending')->name('updateTrending');
    });
});

Route::namespace('Website')->name('website.')->group(function () {

    Route::get('/', 'WebsiteController@homePage')->name('homePage');

    Route::get('/article/{blog}', 'WebsiteController@articlePage')->name('articlePage');

    Route::get('/category/{category}', 'WebsiteController@categoryPage')->name('categoryPage');

    Route::get('/all-articles', 'WebsiteController@allArticlePage')->name('allArticlePage');

    Route::get('/category-list', 'WebsiteController@getCategoryList')->name('getCategoryList');

    Route::get('/video/list', 'WebsiteController@getVideoList')->name('getVideoList');

    Route::get('/top-headlines', 'WebsiteController@getTopHeadingList')->name('getTopHeadingList');

    Route::get('/trending-videos', 'WebsiteController@getTrendingVideos')->name('getTrendingVideos');

    Route::get('/random-article', 'WebsiteController@getRandomArticle')->name('getRandomArticle');

    Route::get('/lastet-article', 'WebsiteController@getLatestArticle')->name('getLatestArticle');

    Route::get('/related-article/{category}', 'WebsiteController@getRelatedArticle')->name('getRelatedArticle');

    Route::get('/category-article', 'WebsiteController@getcategoryWiseArticle')->name('getcategoryWiseArticle');

    Route::get('/article/{blog}/show', 'WebsiteController@getArticle')->name('getArticle');

    Route::get('/search-article', 'WebsiteController@getAllArticle')->name('getAllArticle');
});