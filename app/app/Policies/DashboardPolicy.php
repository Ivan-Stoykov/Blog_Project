<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DashboardPolicy
{
    use HandlesAuthorization;
    public function view(User $user)
    {
        Log::info("Authorization Check: User Role (DB Value): " . $user->role);
       return $user->role === 'admin';
       
    }
}
