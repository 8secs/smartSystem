<?php
/**
 * Created by PhpStorm.
 * User: andres
 * Date: 8/09/15
 * Time: 13:45
 */

Route::group(['prefix' => 'api', 'middleware' => 'auth'], function(){

    // API Routes.
    Route::get('me', ['uses' => 'Arangel\SmartAuth\Http\Controllers\UserController@getUser']);
    Route::put('me', ['uses' => 'Arangel\SmartAuth\Http\Controllers\UserController@updateUser']);

    Route::get('me/friends', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@getFriends']);
    Route::post('me/add-friend', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@addFriend']);
    Route::post('me/remove-friend', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@removeFriend']);

    Route::get('me/followers', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@getFollowers']);
    Route::get('me/following', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@getFollowees']);
    Route::post('me/add-follower', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@addFollower']);
    Route::post('me/remove-follower', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@removeFollower']);
    Route::post('me/add-followee', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@addFollowee']);
    Route::post('me/remove-followee', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@removeFollowee']);

    Route::post('me/store-profile', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@storeProfile']);
    Route::post('me/update-profile', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@updateProfile']);

    Route::post('me/store-location', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@storeLocation']);
    Route::post('me/update-location', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@updateLocation']);
    Route::post('me/delete-location', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\ProfileController@deleteLocation']);

    // Admin Routes
    Route::get('dashboard/users', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@users']);
    Route::get('dashboard/user/{userID}', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@getUser']);
    Route::post('dashboard/user/update-user', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@updateUser']);
    Route::post('dashboard/user/destroy-user', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@destroyUser']);

    Route::get('dashboard/user/send-confirmation-email/{userID}', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@sendConfirmationEmailUser']);


    Route::get('dashboard/roles', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@roles']);
    Route::get('dashboard/permissions', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@permissions']);
    Route::get('dashboard/role/{roleID}', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@getRole']);
    Route::post('dashboard/roles/store-role', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@storeRole']);
    Route::post('dashboard/roles/update-role', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@updateRole']);
    Route::post('dashboard/roles/destroy-role', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@destroyRole']);
    Route::get('dashboard/perm/{permID}', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@getPermission']);
    Route::post('dashboard/perm/store-permission', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@storePermission']);
    Route::post('dashboard/perm/update-permission', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@updatePermission']);
    Route::post('dashboard/perm/destroy-permission', ['uses' => 'Arangel\SmartAdmin\Http\Controllers\AdminController@destroyPermission']);



});