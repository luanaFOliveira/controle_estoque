<?php

namespace App\Services;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Sector;
use App\Models\User;
use App\Models\UserEquipment;
use App\Models\UserSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

    /**
     * @throws ValidationException
     */
    public function updateUser(UpdateUserRequest $request, User $user): UserResource
    {
        $data = $request->validated();

        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'is_admin' => $data['is_admin']
        ]);

        if ($data['password']) {
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
        $sectors = $request->input('sectors');
        $originalSectors = $user->sector()->pluck('name')->toArray();

        $user->sector()->detach();
        if (is_array($sectors) && count($sectors) > 0) {
            $newSectors = Sector::whereIn('name', $sectors)->pluck('sector_id')->toArray();
            $user->sector()->sync($newSectors);
        } else {
            UserSector::where('user_id', $user->user_id)->delete();
            $newSectors = [];
        }

        if ($originalSectors !== $newSectors) {
            $removedSectors = array_diff($originalSectors, $newSectors);
            $removedSectorIds = Sector::whereIn('name', $removedSectors)->pluck('sector_id')->toArray();
            $userEquipments = UserEquipment::where('user_id', $user->user_id)
                ->whereNull('returned_at')
                ->whereHas('equipment', function ($query) use ($removedSectorIds) {
                    $query->whereIn('sector_id', $removedSectorIds);
                })
                ->get();
            foreach ($userEquipments as $userEquipment) {
                $equipment = Equipment::find($userEquipment->equipment_id);
                $equipment->update([
                    'is_available' => true,
                    'is_at_office' => true,
                ]);
                $userEquipment->update([
                    'returned_at' => now()
                ]);
                $equipmentRequest = EquipmentRequest::where('equipment_id', $userEquipment->equipment_id)
                    ->whereNull('returned_at')
                    ->first();
                if ($equipmentRequest) {
                    $equipmentRequest->delete();
                }
            }
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
