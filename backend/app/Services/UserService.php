<?php

namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserService
{
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
        $sectorIds = Sector::whereIn('name', $sectors)->pluck('sector_id')->toArray();
        $user->sector()->attach($sectorIds);
    }

    public function updateUser(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'is_admin' => $data['is_admin']
        ]);

        if($data['password']){
            $user->update([
                'password' => Hash::make($data['password']),
            ]);
        }

        if (isset($data['email'])) {
            $existingUser = User::where('email', $data['email'])->where('user_id', '<>', $user->user_id)->first();

            if ($existingUser) {
                throw ValidationException::withMessages(['email' => ['The email has already been taken.']]);
            }
        }

        $this->updateUserRelations($request, $user);

        return UserResource::make($user);
    }

    private function updateUserRelations(UpdateUserRequest $request, User $user): void
    {
        $equipments = $request->input('equipments');

        if (is_array($equipments) && count($equipments) > 0) {
            $user->equipment()->sync($equipments);
        } else {
            UserEquipment::where('user_id', $user->user_id)->delete();
        }

        $sectors = $request->input('sectors');

        $user->sector()->detach();
        if (is_array($sectors) && count($sectors) > 0) {
            $sectorIds = Sector::whereIn('name', $sectors)->pluck('sector_id')->toArray();
            $user->sector()->sync($sectorIds);
        } else {
            UserSector::where('user_id', $user->user_id)->delete();
        }
    }

    public function changePasswordUser(Request $request): UserResource
    {
        $user_id = $request->input('user_id');
        $user = User::where('user.user_id', $user_id)->first();

        $data = $request->validate([
            'password' => 'required|min:5',
        ]);

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return UserResource::make($user);
    }

    public function deleteUser(User $user): void
    {
        $user->delete();
    }

}
