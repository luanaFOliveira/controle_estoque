<?php

namespace App\Services;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use SebastianBergmann\Type\VoidType;


class UserService {

    public function updateUser(StoreUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        $user->update($data, ['equipments' => $data['equipments'], 'sectors' => $data['sectors']]);
        return UserResource::make($user);
    }

    
    public function deleteUser(User $user): void
    {
        $user->delete();
    }

}
