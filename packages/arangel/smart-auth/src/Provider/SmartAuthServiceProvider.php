<?php

namespace Arangel\SmartAuth\Provider;

use Illuminate\Support\ServiceProvider;

class SmartAuthServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerNamespaces();
        $this->registerProviders();
    }

    protected function registerNamespaces()
    {

        //View::addNamespace('smartSystem', realpath(__DIR__.'/../Resources/Views'));
    }

    /**
     * add Prvoiders
     *
     * @return void
     */
    private function registerProviders()
    {
        //$app = $this->app;
        //$app->register('Arangel\SmartAuth\Provider\SmartAuthServiceProvider');
    }
}
