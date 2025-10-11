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
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
           // 'c_password' => 'required|same:password',
        ]);
        if($validator->fails()){
            return response(["ValidationError"=>$validator->errors()], 400);       
        }
        $input = $request->all();
        $user = User::create($input);
        $success['token'] =  $user->createToken($request->email)->plainTextToken;
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
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
             $user = Auth::user(); 
            $user['token'] =  $user->createToken('MyApp')->plainTextToken; 
            return response($user, 200);
        }else{
            return  response(["message"=>"Wrong credentials"],404);
        } 
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response("Logged out", 200);
    }
}
