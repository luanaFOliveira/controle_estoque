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

    
    public function store(Request $request)
    {
        //esta no AuthController na funcao register
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
        return response()->json(['message' => 'User deleted successfully']);
    }
}
