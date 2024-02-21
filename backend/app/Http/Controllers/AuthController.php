<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Services\googleLoginService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private $googleLoginService;

    public function __construct(googleLoginService $googleLoginService)
    {
        $this->googleLoginService = $googleLoginService;
    }

    public function googleLogin(Request $request): JsonResponse
    {
        return $this->googleLoginService->loginWithGoogle($request);
    }

    public function login(LoginUserRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
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
            'credentials' => $credentials,
        ], 401);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }
}
