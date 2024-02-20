<?php

namespace App\Providers;

use App\Services\EquipmentService;
use App\Services\EquipRequestService;
use App\Services\GoogleLoginService;
use App\Services\SectorService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(SectorService::class, function ($app) {
            return new SectorService();
        });

        $this->app->bind(EquipRequestService::class, function ($app) {
            return new EquipRequestService();
        });

        $this->app->bind(EquipmentService::class, function ($app) {
            return new EquipmentService();
        });

        $this->app->bind(UserService::class, function ($app) {
            return new UserService();
        });

        $this->app->bind(GoogleLoginService::class, function ($app) {
            return new GoogleLoginService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
