<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 6/09/15
 * Time: 11:45
 */

Route::group(['prefix' => 'auth'], function(){

    Route::post('twitter', 'AuthController@twitter');
    Route::post('facebook', 'AuthController@facebook');
    Route::post('foursquare', 'AuthController@foursquare');
    Route::post('github', 'AuthController@github');
    Route::post('google', 'AuthController@google');
    Route::post('linkedin', 'AuthController@linkedin');
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('password/email', 'AuthController@postEmail');
    Route::post('password/reset', 'AuthController@postReset');
    Route::get('verify/{activation_code}', 'AuthController@verifyEmail');
    Route::get('unlink/{provider}', ['middleware' => 'auth', 'uses' => 'AuthController@unlink']);
});

Route::group(['prefix' => 'api', 'middleware' => 'auth'], function(){
    // API Routes.
    Route::get('me', ['uses' => 'UserController@getUser']);
    Route::put('me', ['uses' => 'UserController@updateUser']);

});