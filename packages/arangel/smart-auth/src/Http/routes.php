<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 6/09/15
 * Time: 11:45
 */

Route::group(['prefix' => 'auth'], function(){

    Route::post('twitter', 'Arangel\SmartAuth\Http\Controllers\AuthController@twitter');
    Route::post('facebook', 'Arangel\SmartAuth\Http\Controllers\AuthController@facebook');
    Route::post('foursquare', 'Arangel\SmartAuth\Http\Controllers\AuthController@foursquare');
    Route::post('github', 'Arangel\SmartAuth\Http\Controllers\AuthController@github');
    Route::post('google', 'Arangel\SmartAuth\Http\Controllers\AuthController@google');
    Route::post('linkedin', 'Arangel\SmartAuth\Http\Controllers\AuthController@linkedin');
    Route::post('login', 'Arangel\SmartAuth\Http\Controllers\AuthController@login');
    Route::post('signup', 'Arangel\SmartAuth\Http\Controllers\AuthController@signup');
    Route::post('password/email', 'Arangel\SmartAuth\Http\Controllers\AuthController@postEmail');
    Route::post('password/reset', 'Arangel\SmartAuth\Http\Controllers\AuthController@postReset');
    Route::get('verify/{activation_code}', 'Arangel\SmartAuth\Http\Controllers\AuthController@verifyEmail');
    Route::get('unlink/{provider}', ['middleware' => 'auth', 'uses' => 'Arangel\SmartAuth\Http\Controllers\AuthController@unlink']);
});

Route::group(['prefix' => 'api', 'middleware' => 'auth'], function(){
    // API Routes.
    Route::get('me', ['uses' => 'Arangel\SmartAuth\Http\Controllers\UserController@getUser']);
    Route::put('me', ['uses' => 'Arangel\SmartAuth\Http\Controllers\UserController@updateUser']);

});