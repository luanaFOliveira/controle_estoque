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

        $user->update($data);

        $this->updateUserRelations($request, $user);

        return UserResource::make($user);
    }

    private function updateUserRelations(StoreUserRequest $request, User $user): void
    {
        $equipments = $request->input('equipments');

        if (is_array($equipments) && count($equipments) > 0) {
            $user->equipment()->sync($equipments);
        }

        $sectors = $request->input('sectors');

        if (is_array($sectors) && count($sectors) > 0) {
            $user->sector()->sync($sectors);
        }
    }


    public function deleteUser(User $user): void
    {
        $user->delete();
    }

}
