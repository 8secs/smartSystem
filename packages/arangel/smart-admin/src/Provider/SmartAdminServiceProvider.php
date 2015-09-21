<?php

namespace Arangel\SmartAdmin\Provider;

use Illuminate\Support\ServiceProvider;
use Caffeinated\Themes\Facades\Theme;

class SmartAdminServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../Database/migrations/' => database_path('migrations')
        ], 'migrations');

        $this->publishes([
            __DIR__.'/../Database/seeds/' => database_path('seeds')
        ], 'seeds');

        /*$this->publishes([
            __DIR__.'/../Resources/lang/' => public_path('themes/'. Theme::getActive() . '/assets/resources/admin'),
        ], 'lang');*/

        $this->publishes([
            __DIR__.'/../Resources/data/' => public_path('themes/'. Theme::getActive() . '/assets/data'),
        ], 'data');

        $this->publishes([__DIR__ . '/../Resources/Views/' => public_path('themes/') . Theme::getActive() . '/views/', ], 'views');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        include __DIR__.'/../Http/routes.php';

        $this->app->register('A6digital\Image\DefaultProfileImageServiceProvider');

        $this->app->make('Arangel\SmartAdmin\Http\Controllers\AdminController');
        $this->app->make('Arangel\SmartAdmin\Http\Controllers\ProfileController');

    }
}
