<?php

namespace Arangel\SmartAuth\Provider;

use Illuminate\Support\ServiceProvider;

use Caffeinated\Themes\Facades\Theme;

class SmartAuthServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        if (! $this->app->routesAreCached()) {

            require __DIR__.'/../Http/routes.php';
        }

        $this->publishes([
            __DIR__.'/../Database/migrations/' => database_path('migrations')
        ], 'migrations');

        $this->publishes([
            __DIR__.'/../Resources/lang/' => public_path('themes/'. Theme::getActive() . '/assets/resources/auth'),
        ], 'lang');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //include __DIR__.'/../Http/routes.php';

        $this->app->make('Arangel\SmartAuth\Http\Controllers\AuthController');
        $this->app->make('Arangel\SmartAuth\Http\Controllers\UserController');
        //$this->app->make('Arangel\SmartAuth\Http\Middleware\Authenticate');

    }

}
