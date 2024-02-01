<?php

namespace App\Http\Controllers;

use App\Http\Resources\HistoryResource;
use App\Models\Equipment;
use App\Models\User;
use App\Models\UserEquipment;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function indexUser(Request $request)
    {
        $user_id = $request->input('user_id');

        $user = User::find($user_id);

        if ($user === null) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $query = UserEquipment::where('user_id', $user_id);

        return HistoryResource::collection($query->orderBy('created_at','desc')->paginate(10));
    }

    public function indexEquipment(Request $request)
    {
        $equipment_id = $request->input('equipment_id');

        $equipment = Equipment::find($equipment_id);

        if ($equipment === null) {
            return response()->json(['error' => 'Equipment not found'], 404);
        }

        $query = UserEquipment::where('equipment_id', $equipment_id);

        return HistoryResource::collection($query->orderBy('created_at','desc')->paginate(10));
    }
}