<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginUserRequest $request){
        
        $credencials = $request->only('email', 'password');

        if(Auth::attempt($credencials)){
            $user = Auth::user();
            $token = $user->createToken('ApiToken')->plainTextToken;

            return response()->json([
                'message' => 'Successfully logged in',
                'user' => $user,
                'token' => $token
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
            'credencials' => $credencials,
        ], 401);

    }   

    public function register(StoreUserRequest $request){

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => \Hash::make($data['password']),
            'is_admin' => $data['is_admin']
        ]);

        $token = $user->createToken('ApiToken')->plainTextToken;

        return response()->json([
            'message' => 'Successfully registered',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request){

        $user = $request->user();

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);

    }

    
}
