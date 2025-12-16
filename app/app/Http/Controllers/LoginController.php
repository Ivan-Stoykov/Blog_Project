<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Validator;
use Illuminate\Routing\ResponseFactory;

class LoginController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:8',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        $user = User::create(['name'=>$request->input('name'),
        'email' => $request->input('email'),
        'role' => 'author',
        'password'=>$request->input('password')]);
        $success['token'] =  $user->createToken($request->email, ['*'], now()->addDay())->plainTextToken;
        $success['name'] =  $user->name;
        return response(["success"=>'User register successfully.'], 200);
    }
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
             $user = Auth::user(); 
            $user['token'] =  $user->createToken('MyApp')->plainTextToken; 
            return response($user, 200);
        }else{
            return  response(["ValidationError"=>["Wrong credentials"]],404);
        } 
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->user()->currentAccessToken()->delete();
        return response("Logged out", 200);
    }
}
