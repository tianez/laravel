<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => 'web'], function () {
    Route::get('/', 'HomeController@index');
    Route::post('/', 'HomeController@index_post');
    Route::get('result', 'HomeController@result');
    Route::post('result', 'HomeController@result_post');
    Route::get('addtb', 'HomeController@addtb');
    Route::post('addtb', 'HomeController@addtb_post');
    Route::get('login', 'HomeController@login');
    Route::post('login', 'HomeController@login_post');
    Route::controller('admin', 'AdminController');
    Route::controller('test', 'TestController');
});


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
