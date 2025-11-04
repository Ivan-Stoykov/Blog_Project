<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();
        return response($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        User::create(['name'=>$request->input('name'),
        'email' => $request->input('email'),
        'role' => $request->input('role'),
        'password'=>$request->input('password')]);
        
        return response('User was created', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if($user) return response($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if($user){
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        if($this->authorize('update', $user)) 
            {
                $user->save();
                return response(["message"=>'User was updated'], 201);
            }
        else return response(['message'=>'Unautharized'], 401);
        }
        else return response(["message"=>'User not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if($user){
            if($this->authorize('delete', $user))
            $user->delete();
            return response(["message"=>'User was deleted'], 200);
        }
        else return response(["message"=>'User not found'], 404);
    }
}
