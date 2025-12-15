<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use \App\Models\User;
use \App\Models\Post;
use \App\Models\Category;
use \App\Policies\UserPolicy;
use \App\Policies\PostPolicy;
use \App\Policies\CategoryPolicy;
use \App\Policies\DashboardPolicy;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
    User::class => UserPolicy::class,
    Post::class => PostPolicy::class,
    Category::class => CategoryPolicy::class,
    DashboardPolicy::class => DashboardPolicy::class
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $policies;
        Log::info('*** LOGGING IS ACTIVE ***'); // Test line
    }
}
