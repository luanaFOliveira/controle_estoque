<?php

namespace App\Services;

use App\Http\Resources\EquipmentHistoryResource;
use App\Http\Resources\HistoryResource;
use App\Models\Equipment;
use App\Models\User;
use App\Models\UserEquipment;
use Illuminate\Http\Request;

class HistoryService
{
    public function upsertHistory(Request $request, $select)
    {
        $indexFunction = 'index' . ucfirst($select);
        if (method_exists($this, $indexFunction)) {
            return $this->$indexFunction($request);
        }

        return response()->json(['error' => 'Invalid selection'], 400);
    }

    private function indexUser(Request $request)
    {
        $user_id = $request->input('user_id');
        $user = User::withoutGlobalScope('sectorScope')->auth()->find($user_id);

        if ($user === null) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $query = UserEquipment::where('user_id', $user_id);

        if ($request->has('availability')) {
            $status = $request->input('availability');

            if ($status === 'available') {
                $query->whereNull('returned_at');
            } else if ($status === 'unavailable') {
                $query->whereNotNull('returned_at');
            }

        }

        return HistoryResource::collection($query->orderBy('created_at', 'desc')->paginate(10));
    }

    private function indexEquipment(Request $request)
    {
        $equipment_id = $request->input('equipment_id');

        $equipment = Equipment::find($equipment_id);

        if ($equipment === null) {
            return response()->json(['error' => 'Equipment not found'], 404);
        }

        $query = UserEquipment::where('equipment_id', $equipment_id);

        return EquipmentHistoryResource::collection($query->orderBy('created_at', 'desc')->paginate(10));
    }
}
