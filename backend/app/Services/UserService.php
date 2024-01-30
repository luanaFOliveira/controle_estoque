<?php

namespace App\Services;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;
use Illuminate\Support\Facades\Hash;
use SebastianBergmann\Type\VoidType;


class UserService {

    public function createUser(StoreUserRequest $request): UserResource
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_admin' => $data['is_admin']
        ]);

        $this->createUserRelations($request, $user);

        return UserResource::make($user);
    }

    public function createUserRelations(StoreUserRequest $request, User $user): void
    {
        $sectors = $request->input('sectors');
        $sectorIds = Sector::whereIn('name', $sectors)->pluck('id')->toArray();
        $user->sector()->attach($sectorIds);
    }

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
        }else{
            UserEquipment::where('user_id', $user->user_id)->delete();
        }

        $sectors = $request->input('sectors');

        if (is_array($sectors) && count($sectors) > 0) {
            $user->sector()->sync($sectors);
        }else{
            UserSector::where('user_id', $user->user_id)->delete();
        }
    }


    public function deleteUser(User $user): void
    {
        $user->delete();
    }

}
