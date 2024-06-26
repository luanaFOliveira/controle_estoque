<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserDetailedResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = User::query();

        if ($request->has('name')) {
            $search = $request->input('name');
            $query->where('name', 'ilike', "%$search%");
        }

        return UserResource::collection($query->orderBy('user_id')->paginate(10));
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(['data' => new UserDetailedResource($user)]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request);

        $token = $user->createToken('ApiToken')->plainTextToken;

        return response()->json([
            'message' => 'Successfully registered',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    /**
     * @throws ValidationException
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $userResource = $this->userService->updateUser($request, $user);
        return response()->json(['message' => 'User updated successfully', 'data' => $userResource]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $userResource = $this->userService->changePasswordUser($request);
        return response()->json(['message' => 'Password updated successfully', 'data' => $userResource]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->userService->deleteUser($user);
        return response()->json(['message' => 'User deleted successfully', 'data' => $user]);
    }
}
