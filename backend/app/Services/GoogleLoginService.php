<?php

namespace App\Services;

use App\Models\User;
use Google_Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoogleLoginService
{
    private function verifyGoogleToken($id_token): ?array
    {
        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
            return $payload;
        } else {
            return null;
        }
    }

    public function loginWithGoogle(Request $request): JsonResponse
    {
        $googleToken = $request->input('googleToken');
        $payload = $this->verifyGoogleToken($googleToken);
        if ($payload) {
            $user = User::where('email', $payload['email'])->first();

            if ($user) {
                $token = $user->createToken('ApiToken')->plainTextToken;

                return response()->json([
                    'message' => 'Successfully logged in with Google',
                    'user' => $user,
                    'token' => $token
                ], 200);
            } else {
                return response()->json([
                    'message' => 'User not found',
                ], 404);
            }
        } else {
            return response()->json([
                'message' => 'Invalid Google token',
            ], 401);
        }
    }
}
