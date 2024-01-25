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

        $credencials = $request->validated();

        if(!Auth::attempt($credencials)){
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'message' => 'Successfully logged in',
            'user' => $user,
            'token' => $token
        ], 200);

    }   

    public function register(StoreUserRequest $request){

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => \Hash::make($data['password']),
            'is_admin' => $data['is_admin']
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'message' => 'Successfully registered',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request){

        Auth::logout();

        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);

    }

    
}
