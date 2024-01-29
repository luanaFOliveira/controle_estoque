<?php

namespace App\Providers;

use App\Services\EquipmentService;
use App\Services\EquipRequestService;
use App\Services\SectorService;
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
