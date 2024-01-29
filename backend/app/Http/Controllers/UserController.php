<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }
    
    public function index(Request $request)
    {
        
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where('name', 'ilike', "%$search%");
        }

        return UserResource::collection($query->orderBy('user_id')->paginate(10));
        
    }

    
    public function store(StoreUserRequest $request){

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

    
    public function show(User $user)
    {
        return response()->json(['data' => new UserResource($user)]);
    }
   
    
    public function update(StoreUserRequest $request, User $user)
    {
        $userResource = $this->userService->updateUser($request, $user);
        return response()->json(['message' => 'User updated successfully', 'data' => $userResource]);
    }

    
    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return response()->json(['message' => 'User deleted successfully','data' => $user]);
    }
}
