<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::group([
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => [ 'localeSessionRedirect', 'localizationRedirect' ]
    ],
    function() {

        Route::get('/', function() {
            /**
             * TODO: estas variables tienen que venir en un futuro de bbdd
             */
            $theme = Theme::getActive();
            $title = "Smart System";
            return Theme::view('default', ['theme' => $theme, 'title' => $title]);
        });

        Route::get('getSopportedLocales', function(){
            return response()->json(
                [
                    'sopportedLocales' => LaravelLocalization::getSupportedLocales(),
                    'currentLocale' => LaravelLocalization::getCurrentLocale()
                ]
            );
        });
    }
);
